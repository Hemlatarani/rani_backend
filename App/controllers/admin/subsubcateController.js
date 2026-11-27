const { categoryModel } = require("../../models/categoryModel")
const { subcategoryModel } = require("../../models/subcategoryModel")
const { subsubcategoryModel } = require("../../models/subsubcategoryModel")
let streamifier=require("streamifier")
const cloudinary=require("../../config/cloudinary")
// let mongoose = require("mongoose")


let UploadCloudinary=(filebuffer)=>{
    return new Promise((resolve,reject)=>{
        let uploadStream=cloudinary.uploader.upload_stream(
            {
                folder:"subsubcategory",
                resource_type:"image"
            },

            (error,result)=>{
                
                if(error){
                    return reject(error)
                }
                resolve(result);
            }
        );
            streamifier.createReadStream(filebuffer)
            .pipe(uploadStream)

    })
}


// let subsubcategoryCreate = async (req, res) => {
//     // console.log(req.body)
//     // console.log(req.file)
//     let insertObj = { ...req.body }
//     if (req.file) {
         
//     }
//     console.log(insertObj)
//     try {
//         if (req.file) {
//             let uploadResult = await UploadCloudinary(req.file.buffer);
//             insertObj.subsubcategoryImage = uploadResult.secure_url;
//         }
//         let subsubcategoryCollection = await subsubcategoryModel(insertObj)
//         let subsubcategoryRes = await subsubcategoryCollection.save()
//         // data insert save and insert dono se hoga
//         // console.log(subsubcategoryRes)
//         obj = {
//             status: 1,
//             msg: "subsubcategory add",
//             subsubcategoryRes
//         }
//         res.send(obj)
//     }
//     catch (err) {
    
//         let errorMessage
//         if (err.code == 11000) {
//             errorMessage = "subsubcategory already exists";
//         }
//         if (err.errors) {
//             if (err.errors.subsubcategoryName) {
//                 errorMessage = err.errors.subsubcategoryName.message;
//             }
//         }

//         obj = {
//             status: 0,
//             msg: "subsubcategory not added",
//             errorMessage
//         }
//         res.send(obj)
//     }

// }
let subsubcategoryCreate = async (req, res) => {

    let insertObj = { ...req.body };

    console.log("CREATE API HIT hloooooooooooooooooooooooooooooooooooooooooooooooo");
    console.log("BODY: bbdssssssssssssssssssssssssssssssssss", req.body);
    console.log("FILE:kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", req.file);

    try {

        if (req.file) {
            let uploadResult = await UploadCloudinary(req.file.buffer);

            // console.log("cloudinary ",uploadResult.secure_url)

            insertObj.subsubcategoryImage = uploadResult.secure_url;
        }

        let subsubcategoryCollection = new subsubcategoryModel(insertObj);

        let subsubcategoryRes = await subsubcategoryCollection.save();
        // console.log("SAVED DATA:", subsubcategoryRes);

        res.send({
            status: 1,
            msg: "subsubcategory add successfully",
            subsubcategoryRes
        });

    }
    catch (err) {

        console.log("ACTUAL ERROR:", err);

        let errorMessage = err.message;

        if (err.code == 11000) {
            errorMessage = "subsubcategory already exists";
        }

        if (err.errors) {
            if (err.errors.subsubcategoryName) {
                errorMessage = err.errors.subsubcategoryName.message;
            }
        }

        res.send({
            status: 0,
            msg: "subsubcategory not added",
            error: errorMessage
        });

    }
//     catch (err) {

//     let errorMessage;

//     // ...

//     obj = {
//         status: 0,
//         msg: "subsubcategory not added",
//         errorMessage
//     };

//     res.send(obj);
// }

};

let subsubcategoryView = async (req, res) => {
    let skip = 0
    let limit = 5

    if (req.query.limit) {
        limit = req.query.limit;

    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit

    }

    let subsubcategoryCollection = await subsubcategoryModel.find()
    .populate('parentCategory','categoryName').populate('subCategoryData','subcategoryName').skip(skip).limit(limit)
    // console.log(subCategoryData)
    let subsubcategorylength = await subsubcategoryModel.find()
    let obj = {
        status: 1,
        msg: "subsubcategory view",
        staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
        subsubcategoryCollection,
        length: subsubcategorylength.length,
        totalpages: Math.ceil(subsubcategorylength.length / limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}
let parentCategory = async (req, res) => {
    let categoryData = await categoryModel.find({ categoryStatus: true }).select("categoryName")
    obj = {
        status: 1,
        categoryData
    }
    res.send(obj)
}
let subCategoryData = async (req, res) => {
    let { parentid } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(parentid)) {
        return res.send({
            status: 0,
            msg: "Invalid category ID",
            subcategoryyData: []
        })
    }
    
    let subcategoryyData = await subcategoryModel.
        find({ subcategoryStatus: true, parentCategory: parentid })
        .select("subcategoryName")
    obj = {
        status: 1,
        subcategoryyData
    } 

    res.send(obj)
}

let subsubcategorydelete = async (req, res) => {

    let { id } = req.params;
    let obj
    subsubcategoryModel.deleteOne({ _id: id })
        .then((Delres) => {
            obj = {
                status: 1,
                msg: "subsubcategory add",
                Delres
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 0,
                err
            }
            res.send(obj)
        })
}
let subsubcategoryUpdate = async (req, res) => {
    let insertObj = req.params
    if (req.file) {
        if (req.file) {

        const uploadResult = await UploadCloudinary(req.file.buffer);

        insertObj.subcategoryImage = uploadResult.secure_url;
        console.log("uploadImage",uploadResult.secure_url)
    }
    }
    let { id } = req.params;
    let obj
    try {
        let subsubcategoryRes = await subsubcategoryModel.updateOne(
            {
                _id: id
            },
            {
                $set: insertObj
            }
        )
        obj = {
            status: 1,
            msg: "subsubcategory update successfully",
            subsubcategoryRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage: "subsubcategory already exist"
        }
        if (err.errors) {
            if (err.errors.subsubcategoryName) {
                errorMessage: err.errors.subsubcategoryName.message
            }
        }
        obj = {
            status: 0,
            errorMessage
        }
    }

}
let sbucategoryMultidelete = (req, res) => {
    let { ids } = req.body;
    let obj
    subsubcategoryModel.deleteMany({ _id: ids })
        .then((delRes) => {
            obj = {
                status: 1,
                msg: "multidelete successfully",
                delRes
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 0,
                err
            }
            res.send(obj)
        })
}
let scsingleData = async (req, res) => {
    let { id } = req.params;
    let subsubcategoryData = await subsubcategoryModel.findOne({_id:id })
    let obj = {
        status: 1,
        msg: "single data fetch successfully",
        subsubcategoryData
    }
    res.send(obj)
}
let subsubstatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let TstatusUpdate = await subsubcategoryModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    subsubcategoryStatus: {
                        $not: "$subsubcategoryStatus"
                    }
                }
            }
        ])
    let obj = {
        status: 1,
        msg: "subsubcategory status update successfully",
        TstatusUpdate

    }
    res.send(obj)
}


module.exports = { subsubcategoryCreate, subsubcategoryView, parentCategory, subsubcategorydelete, subsubcategoryUpdate, sbucategoryMultidelete, scsingleData, subsubstatusUpdate, subCategoryData }