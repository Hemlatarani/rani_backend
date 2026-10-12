const { enquiryModel } = require("../../models/enquiryModel");

// 1. Enquiry Create (Contact Us form se data save karne ke liye)
let enquiryCreate = async (req, res) => {
    // let obj;
    // try {
    // console.log("hello",req.body)
        let enquiryCollection = new enquiryModel(req.body);
        let enquiryRes = await enquiryCollection.save();
        obj = {
            status: 1,
            msg: "enquiry added",
            enquiryRes
        };
        res.send(obj)
        console.log("hemlata",obj)
    // }
    // catch (err) {
    //     let errorMessage = "enquiry not added";
    //     if (err.errors) {
    //         // Agar koi validation error ho (jaise name required hai)
    //         if (err.errors.name) errorMessage = err.errors.name.message;
    //     }
    //     obj = {
    //         status: 0,
    //         msg: "enquiry not added",
    //         errorMessage
    //     };
    //     res.send(obj);
    // }
};

// 2. Enquiry View (Admin Panel ke liye with Search & Pagination)
// let enquiryView = async (req, res) => {
//     let skip = 0;
//     let limit = 5;
//     let queryObj = {}; // Search filter ke liye

//     if (req.query.limit) {
//         limit = parseInt(req.query.limit);
//     }
//     if (req.query.page) {
//         skip = (req.query.page - 1) * limit;
//     }

//     // SIR KA SEARCH LOGIC: Agar search query ho toh Name ya Email mein check kare
//     if (req.query.search) {
//         let search = req.query.search;
//         queryObj = {
//             $or: [
//                 { name: { $regex: search, $options: 'i' } },
//                 { email: { $regex: search, $options: 'i' } },
//                 { subject: { $regex: search, $options: 'i' } }
//             ]
//         };
//     }
// }
let getEnquiry= async(req,res)=>{

    let EnquiryData=await enquiryModel.find()
    let obj={
        status:1,
        msg:"Database successfully",
        EnquiryData
     }
     res.send(obj)
    }


module.exports={enquiryCreate,getEnquiry };