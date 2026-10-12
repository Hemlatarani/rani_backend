// const { companyAccountSchemaModel } = require("../../models/companyAccountModel")

// let createCompany=(req,res)=>{
//     let {Name,Email,Mobilenumber,Address,MapUrl,Facebook,Twitter,Instagram,whatsapp}=req.body;
//     let obj;
//     let companyData=new companyAccountSchemaModel({
//         Name,
//         Email,
//         Mobilenumber,
//         Address,
//         MapUrl,
//         imageLogo,
//         Facebook,
//         Twitter,
//         Instagram,
//         whatsapp
//     })
//     companyData.save()
//     .then((data)=>{
//         obj={
//             status:1,
//             msg:"company data added",
//             data
//         }
//         res.send(obj)
//     })
//     .catch((err)=>{
//         let errorMessage="";
//         if(err.code===11000){
//             errorMessage="Company already exists";
//         }
//         else{
//             errorMessage=err.message;
//         }
//         obj={
//             status:0,
//             msg:errorMessage
//         }
//         res.send(obj)
//     })
// }

// let getcompanydata=async(req,res)=>{
//     let obj;
//     try{
//         let companydata=await companyAccountSchemaModel.find()
//         obj={
//             status:1,
//             msg:"company data found",
//             companydata
//         }
//         res.send(obj)
//     }
//     catch(err){
//         obj={
//             status:0,
//             msg:"company data not found",
//             err:err.message
//         }
//         res.send(obj)
//     }
// }

// // let UpdatCompanydata=async(req,res)=>{
// //     let obj;
// //     try{
// //         let {Name,Email,Mobilenumber,Address,MapUrl,Facebook,Twitter,Instagram,whatsapp}=req.body;
// //         let companydata=await companyAccountSchemaModel.findByIdAndUpdate(req.params.id,{
// //             Name,
// //             Email,
// //             Mobilenumber,
// //             Address,
// //             MapUrl,
// //             imageLogo,
// //             Youtube,
// //             Facebook,
// //             Twitter,
// //             Instagram,
// //             whatsapp
// //         },{new:true})
        
// //         if(req.file){
// //             companydata.imageLogo= req.file.path;
// //         }
// //         obj={
// //             status:1,
// //             msg:"company data updated",
// //             companydata
// //         }
// //         res.send(obj)
// //     }
// //     catch(err){
// //         obj={
// //             status:0,
// //             msg:"company data not updated",
// //             err:err.message
// //         }
// //         res.send(obj)
// //     }
// // }
// let UpdatCompanydata = async (req, res) => {
//     let obj;
//     try {
//         let {
//             Name,
//             Email,
//             Mobilenumber,
//             Address,
//             MapUrl,
//             Facebook,
//             Twitter,
//             Instagram,
//             whatsapp,
//             Youtube
//         } = req.body;

//         // ✅ pehle object banao
//         let updateData = {
//             Name,
//             Email,
//             Mobilenumber,
//             Address,
//             MapUrl,
//             Facebook,
//             Twitter,
//             Instagram,
//             whatsapp,
//             Youtube,
//             imageLogo,
//         };

//         // ✅ file aaye to hi add karo
//         if (req.file) {
//             updateData.imageLogo = req.file.path;
//         }

//         // ✅ ek hi baar DB update
//         let companydata = await companyAccountSchemaModel.findByIdAndUpdate(
//             req.params.id,
//             updateData,
//             { new: true }
//         );

//         res.send({
//             status: 1,
//             msg: "company data updated",
//             companydata
//         });

//     } catch (err) {
//         res.send({
//             status: 0,
//             msg: "company data not updated",
//             err: err.message
//         });
//     }
// };
// module.exports={getcompanydata,UpdatCompanydata,createCompany}
const { companyAccountSchemaModel } = require("../../models/companyAccountModel")


// ✅ CREATE COMPANY
let createCompany = (req, res) => {
    let { Name, Email, Mobilenumber, Address, MapUrl, Facebook, Twitter, Instagram, whatsapp } = req.body;

    let obj;

    // ✅ image fix (yahi main error tha)
    let imageLogo = req.file ? req.file.filename : "";

    let companyData = new companyAccountSchemaModel({
        Name,
        Email,
        Mobilenumber,
        Address,
        MapUrl,
        imageLogo,
        Facebook,
        Twitter,
        Instagram,
        whatsapp
    });

    companyData.save()
        .then((data) => {
            obj = {
                status: 1,
                msg: "company data added",
                data
            }
            res.send(obj)
        })
        .catch((err) => {

            let errorMessage = "";
            if (err.code === 11000) {
                errorMessage = "Company already exists";
            }
            else {
                errorMessage = err.message;
            }

            obj = {
                status: 0,
                msg: errorMessage
            }
            res.send(obj)
        })
}



// ✅ GET COMPANY DATA
let getcompanydata = async (req, res) => {
    let obj;
    try {
        let companydata = await companyAccountSchemaModel.find()
        obj = {
            status: 1,
            msg: "company data found",
            companydata
        }
        res.send(obj)
    }
    catch (err) {
        obj = {
            status: 0,
            msg: "company data not found",
            err: err.message
        }
        res.send(obj)
    }
}



// ✅ UPDATE COMPANY DATA
let UpdatCompanydata = async (req, res) => {
    let obj;
    try {
        let {
            Name,
            Email,
            Mobilenumber,
            Address,
            MapUrl,
            Facebook,
            Twitter,
            Instagram,
            whatsapp,
            Youtube
        } = req.body;

        // ❌ imageLogo hata diya yahan se (error ka reason)
        let updateData = {
            Name,
            Email,
            Mobilenumber,
            Address,
            MapUrl,
            Facebook,
            Twitter,
            Instagram,
            whatsapp,
            Youtube
        };

        // ✅ file aaye to hi add karo
        if (req.file) {
            updateData.imageLogo = req.file.filename;
        }

        let companydata = await companyAccountSchemaModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        obj = {
            status: 1,
            msg: "company data updated",
            companydata
        }
        res.send(obj)

    } catch (err) {
        obj = {
            status: 0,
            msg: "company data not updated",
            err: err.message
        }
        res.send(obj)
    }
}


module.exports = { getcompanydata, UpdatCompanydata, createCompany }