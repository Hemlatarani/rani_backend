const orderModel = require('../../models/orderModel');
const cartModel = require('../../models/cartModel');


const Razorpay = require('razorpay');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { transporter } = require('../../config/MailConfig');

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================= EMAIL FUNCTION =================
const sendEmail = async (to, subject, text) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("EMAIL CREDENTIALS MISSING!");
            return false;
        }

        // let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });

        let mailInfo = await transporter.sendMail({
            from: `"Ecommerce Store" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: `<h3>${subject}</h3><p>${text}</p>`
        });

        console.log("Email sent successfully:", mailInfo.messageId);
        return true;

    } catch (error) {
        console.log("Email send failed:", error.message);
        return false;
    }
};

// ================= SAVE ORDER =================
const saveOrder = async (req, res) => {
    let { id, ...orData } = req.body;

    try {
        const userEmail = orData.email || 
                         orData.shippingAddress?.email || 
                         orData.billingAddress?.email || 
                         orData.customerEmail;
        
        orData.email = userEmail;

        if (orData.paymentMethod == 1) {
            orData.orderStatus = "process";
            orData.userId = id;

            let order = new orderModel(orData);
            let savedOrder = await order.save();

            await cartModel.deleteMany({ userId: id });
            console.log("Cart cleared for COD order, user:", id);

            if (savedOrder.email) {
                const emailSent = await sendEmail(
                    savedOrder.email,
                    "Order Placed Successfully (COD)",
                    `Dear Customer, Your Cash on Delivery order has been placed successfully! Order ID: ${savedOrder._id}. We will contact you soon for delivery confirmation.`
                );
                
                if (emailSent) {
                    console.log("COD confirmation email sent to:", savedOrder.email);
                } else {
                    console.log("Failed to send COD confirmation email");
                }
            }

            return res.json({
                status: true,
                msg: "Order placed (COD)"
            });

        } else {
            orData.orderStatus = "process";
            orData.userId = id;
            orData.paymentStatus = 1;

            let order = new orderModel(orData);
            let dbRes = await order.save();

            let razorOrderObj = {
                amount: orData.orderAmount * 100,
                currency: "INR",
                receipt: dbRes._id.toString()
            };

            let orderRes = await instance.orders.create(razorOrderObj);

            await orderModel.updateOne(
                { _id: dbRes._id },
                { $set: { razorpayOrderId: orderRes.id } }
            );

            return res.json({
                status: true,
                msg: "Order created",
                orderRes
            });
        }

    } catch (e) {
        console.log("SAVE ORDER ERROR:", e);
        return res.status(500).json({
            status: false,
            msg: e.message
        });
    }
};

// ================= VERIFY ORDER =================
let verifyOrder = async (req, res) => {
    try {
        let { razorpay_payment_id, razorpay_order_id, razorpay_signature, id } = req.body;

        let hmc = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmc.update(razorpay_order_id + "|" + razorpay_payment_id);
        let generated_signature = hmc.digest("hex");

        if (generated_signature == razorpay_signature) {
            await orderModel.updateOne(
                { razorpayOrderId: razorpay_order_id },
                {
                    $set: {
                        paymentStatus: 2,
                        razorpayPaymentId: razorpay_payment_id,
                        orderStatus: "confirmed"
                    }
                }
            );

            let orderData = await orderModel.findOne({ razorpayOrderId: razorpay_order_id });

            await cartModel.deleteMany({ userId: id });
            console.log("Cart cleared for user:", id);

            if (orderData && orderData.email) {
                const emailSent = await sendEmail(
                    orderData.email,
                    "Payment Confirmed - Order Confirmed",
                    `Dear Customer, Your payment has been successfully processed and your order is confirmed! Order ID: ${orderData._id}. Thank you for shopping with us.`
                );
                
                if (emailSent) {
                    console.log("Payment confirmation email sent to:", orderData.email);
                } else {
                    console.log("Failed to send payment confirmation email");
                }
            }

            return res.json({
                status: true,
                msg: "Payment verified and order confirmed"
            });

        } else {
            return res.json({
                status: false,
                msg: "Payment verification failed"
            });
        }

    } catch (error) {
        console.log("VERIFY ERROR:", error);
        return res.status(500).json({
            status: false,
            msg: "Order verification failed"
        });
    }
};

// ================= VIEW ORDER =================
let viewOrder = async (req, res) => {
    try {
        let { id } = req.body;
        let viewData = await orderModel.find({ userId: id });

        return res.json({
            status: true,
            msg: "data fetch",
            data: viewData
        });

    } catch (err) {
        console.log("VIEW ERROR:", err);
        return res.json({
            status: 0,
            msg: "data fetch failed"
        });
    }
};

// ================= GET ORDER DETAIL =================
let getOrderDetail = async (req, res) => {
    try {
        let user = req.user;
        let orderData = await orderModel.find({ userId: user.id });

        return res.json({
            status: 1,
            msg: "order detail",
            orderData
        });

    } catch (err) {
        console.log("DETAIL ERROR:", err.message);
        return res.json({
            status: 0,
            msg: "order detail fetch failed",
            error: err.message
        });
    }
};

module.exports = { saveOrder, verifyOrder, viewOrder, getOrderDetail, sendEmail };