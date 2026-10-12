// const { response } = require("express")
// const { enquiryModel } = require("../../models/enquiryModel")

// const { status } = require("express/lib/response")

// // Submit contact form
// const submitEnquiry = async (req, res) => {
//     try {
//         const { name, email, phone, subject, message } = req.body

//         // Validation
//         if (!name || !email || !phone || !subject || !message) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             })
//         }

//         const enquiry = new Enquiry({
//             name,
//             email,
//             phone,
//             subject,
//             message
//         })

//         await enquiry.save()

//         res.status(201).json({
//             success: true,
//             message: "Your enquiry has been submitted successfully. We will contact you soon!",
//             data: enquiry
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// let getAllEnquiries = async (req, res) => {

//     try {

//         let EnquiryData=await enquiryModel.find().sort({createdAt:-1})
//         let  obj={
//             status:1,
//             msg:"Database successfully",
//             EnquiryData
//          }
//          res.send(obj)
//         }
        
    
//     catch (err) {
//         console.log(err);
//         return res.send({ status: 0, 
//             msg: "Database Error", err })

//     }

//     // self make code ye ek new data save krr rha h 
//     // let enqObj={...req.body}
    
//     // let EnquiryData=await enquiryModel(enqObj)
//     // let EnqRes= EnquiryData.save()
//     // let obj={
//     //     status:1,
//     //     EnqRes
//     // }
//     // res.send(obj)

// };



// module.exports = {submitEnquiry,getAllEnquiries}
const { status } = require("express/lib/response")
const { enquiryModel } = require("../../models/enquiryModel")

// Submit contact form
const submitEnquiry = async (req, res) => {
    console.log("formsubmit", req.body)
    try {
        const { name, email, phone ,shipping_mobile_no, message } = req.body

        // Validation
        if (!name || !email || !phone ||!shipping_mobile_no|| !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const enquiry = new enquiryModel({
            name,
            email,
            phone,
        shipping_mobile_no,
            message
        })

        await enquiry.save()

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: enquiry
        })

    } catch (error) {
        console.log("ERROR:", error); // 🔥 debugging
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// GET ALL ENQUIRIES
const getAllEnquiries = async (req, res) => {
    try {

        let EnquiryData = await enquiryModel.find().sort({ createdAt: -1 })

        let obj={
status:1,
msg:"database successfully",
EnquiryData
        }
        res.send(obj)
        // res.send({
        //     status: 1,
        //     msg: "Database successfully",
        //     EnquiryData
        // })

    } catch (err) {
        console.log(err);
        res.send({
            status: 0,
            msg: "Database Error",
            err
        })
    }
}

module.exports = { submitEnquiry, getAllEnquiries }