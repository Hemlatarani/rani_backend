const { categoryModel } = require("../../models/categoryModel")
const { subcategoryModel } = require("../../models/subcategoryModel")
let streamifier = require("streamifier")
let cloudinary = require("../../config/cloudinary")



let UploadCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "subcategories",
                resource_type: "image"

            },
            (error, result) => {
                if (error) {
                    return reject(error)
                }
                resolve(result);

            }
        );
        streamifier.createReadStream(fileBuffer)
            .pipe(uploadStream);
    })
}
// let subcategoryCreate = async (req, res) => {


//     try {
//                 console.log("File received:", req.file);

//         let insertObj = { ...req.body };

//         console.log("Subcategory File:", req.file);

//         if (req.file) {
//             // console.log("hello Hemlata",req.file)
//             const uploadResult = await UploadCloudinary(req.file.buffer);

//             insertObj.subcategoryImage = uploadResult.secure_url;
//         }

//         let subcategoryRes = await subcategoryModel.create(insertObj);

//         res.send({
//             status: 1,
//             msg: "Subcategory added successfully",
//             subcategoryRes
//         });

//     }
//     catch (err) {

//         console.log("Subcategory creation error:", err);

//         let errorMessage = "Server Error";

//         if (err.code === 11000) {
//             errorMessage = "Subcategory already exists";
//         }

//         if (err.name === "ValidationError") {
//             errorMessage = "Check field values";
//         }

//         res.status(400).send({
//             status: 0,
//             msg: "Subcategory not added",
//             errorMessage
//         });
//     }
// };

let subcategoryCreate = async (req, res) => {
    console.log("File:", req.file);
console.log("Buffer:", req.file?.buffer);
    let insertObj = { ...req.body }
    if (req.file) {
       let uploadResult= await UploadCloudinary(req.file.buffer)
       insertObj.subcategoryImage=uploadResult.secure_url;
    }
    // res.send(insertObj)
    try {
        let subcategoryCollection = await subcategoryModel(insertObj)
        let subcategoryRes = await subcategoryCollection.save()
        // data insert save and insert dono se hoga
        obj = {
            status: 1,
            msg: "subcategory add",
            subcategoryRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "subcategory already exists";
        }
        if (err.errors) {
            if (err.errors.subcategoryName) {
                errorMessage = err.errors.subcategoryName.message;
            }
        }

        obj = {
            status: 0,
            msg: "subcategory not added",
            errorMessage
        }
        res.send(obj)
    }

}

let subcategoryView = async (req, res) => {
    let skip = 0
    let limit = 5

    if (req.query.limit) {
        limit = req.query.limit;

    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit

    }

    let subcategoryCollection = await subcategoryModel.find().populate('parentCategory', 'categoryName').skip(skip).limit(limit)
    subcategorylength = await subcategoryModel.find()
    let obj = {
        status: 1,
        msg: "subcategory view",
        staticPath: process.env.SUBCATEGORYIMAGEPATH,
        subcategoryCollection,
        length: subcategorylength.length,
        totalpages: Math.ceil(subcategorylength.length / limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}
let parentCategory = async (req, res) => {
    let categoryData = await categoryModel.
        find({ categoryStatus: true })
        .select("categoryName")
    obj = {
        status: 1,
        categoryData
    }
    res.send(obj)
}


let subcategorydelete = async (req, res) => {

    let { id } = req.params;
    let obj
    subcategoryModel.deleteOne({ _id: id })
        .then((Delres) => {
            obj = {
                status: 1,
                msg: "subcategory add",
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
let subcategoryUpdate = async (req, res) => {
    let insertObj = req.body

    if (req.file) {

        const uploadResult = await UploadCloudinary(req.file.buffer);

        insertObj.subcategoryImage = uploadResult.secure_url;
    }


    let { id } = req.params;

    try {
        let subcategoryRes = await subcategoryModel.updateOne(
            {
                _id: id
            },
            {
                $set: insertObj
            }
        )
        obj = {
            status: 1,
            msg: "subcategory update successfully",
            subcategoryRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage: "subcategory already exist"
        }
        if (err.errors) {
            if (err.errors.subcategoryName) {
                errorMessage: err.errors.subcategoryName.message
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
    subcategoryModel.deleteMany({ _id: ids })
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
    let subcategoryData = await subcategoryModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "single data fetch successfully",
        subcategoryData
    }
    res.send(obj)
}
let substatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let TstatusUpdate = await subcategoryModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    subcategoryStatus: {
                        $not: "$subcategoryStatus"
                    }
                }
            }
        ])
    let obj = {
        status: 1,
        msg: "subcategory status update successfully",
        TstatusUpdate

    }
    res.send(obj)
}

module.exports = { subcategoryCreate, subcategoryView, parentCategory, subcategorydelete, subcategoryUpdate, sbucategoryMultidelete, scsingleData, substatusUpdate }