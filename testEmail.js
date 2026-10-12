const nodemailer = require("nodemailer");
require('dotenv').config();

const testEmail = async () => {
    try {
        console.log("Testing email with credentials:");
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "***FOUND***" : "***MISSING***");

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Test connection
        await transporter.verify();
        console.log("✅ SMTP Connection successful!");

        // Send test email
        let info = await transporter.sendMail({
            from: `"Test Store" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: "Test Email - Order System",
            html: "<h3>Test Successful!</h3><p>Your email configuration is working!</p>"
        });

        console.log("✅ Test email sent:", info.messageId);
        console.log("Check your inbox!");

    } catch (error) {
        console.log("❌ Email test failed:");
        console.log("Error:", error.message);
        
        if (error.code === 'EAUTH') {
            console.log("\n🔧 SOLUTION:");
            console.log("1. Enable 2-Factor Authentication in Gmail");
            console.log("2. Generate App Password from Google Account Security");
            console.log("3. Use that 16-digit password in .env file");
        }
    }
};

testEmail();