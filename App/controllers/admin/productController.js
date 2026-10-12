const { categoryModel } = require("../../models/categoryModel")
const { colorModel } = require("../../models/colorModel")
const { materialModel } = require("../../models/materialModel")
const { productModel } = require("../../models/productModel")
const { subsubcategoryModel } = require("../../models/subsubcategoryModel")
let  slugify = require('slugify')





let productCreate = async (req, res) => {
    // console.log(req.body)
    // console.log(req.files)


    let insertObj = { ...req.body }
    let obj;
    insertObj.isSelling = insertObj.isSelling === "true";
    insertObj.topRated = insertObj.topRated === "true";
    insertObj.isUpsell = insertObj.isUpsell === "true";

    // optional: agar "Nothing Select" ho
    if (!req.body.isSelling) delete insertObj.isSelling;
    if (!req.body.topRated) delete insertObj.topRated;
    if (!req.body.isUpsell) delete insertObj.isUpsell;

    insertObj['slug'] = slugify(req.body.productName, { lower: true, strict: true })

    // console.log(req.files)
    if (req.files) {
        if (req.files.productImage) {
            insertObj['productImage'] = req.files.productImage[0].filename
        }


        if (req.files.backImage) {
            insertObj['backImage'] = req.files.backImage[0].filename
        }



        if (req.files.productGallery) {
            insertObj['galleryImages'] = req.files.galleryImages.map((v) => v.filename)
        }
    }

    if (req.files.productImage) {         // productimage  agar aa rha hai tab
        insertObj["productImage"] = req.files.productImage[0].filename

    }
    if (req.files.backImage) {          //  backimage agar aa rha hai tab
        insertObj["backImage"] = req.files.backImage[0].filename


    }
    if (req.files.galleryImage) {
        insertObj["galleryImage"] = req.files.galleryImage.map((v) => v.filename)

    }
    // console.log("final object", insertObj)
    try {
        let productCollection = await productModel(insertObj)
        let productRes = await productCollection.save()
        // data insert save and insert dono se hoga
        // console.log(productRes)
        obj = {
            status: 1,
            msg: "product added",
            productRes
        }
        return res.send(obj)
    }
    catch (err) {
        console.log(err);
        obj = {
            status: 1,
            msg: "server error",
            err

        }
        return res.send(obj)

    }
    // catch (err) {
    //     console.log(err)
    //     let errorMessage
    //     if (err.code == 11000) {
    //         errorMessage = "product already exists";
    //     }
    //     if (err.errors) {
    //         if (err.errors.productName) {
    //             errorMessage = err.errors.productName.message;
    //         }
    //     }

    //     obj = {
    //         status: 0,
    //         msg: "product not added",
    //         errorMessage
    //     }
    //     res.send(obj)
    // }
    // res.send(req.body)

}

let productView = async (req, res) => {
    let skip = 0
    let limit = 5

    if (req.query.limit) {
        limit = req.query.limit;

    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit

    }

    let productCollection = await productModel.find().populate('parentCategory', 'categoryName').skip(skip).limit(limit)
    console.log("FIRST PRODUCT ", productCollection[0]);

    productlength = await productModel.find()
    let obj = {
        status: 1,
        msg: "product view",
        // staticPath: process.env.SUBCATEGORYIMAGEPTAH,
        staticPath: process.env.PRODUCTIMAGEPATH,


        productCollection,
        length: productlength.length,
        totalpages: Math.ceil(productlength.length / limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}
let getParentcategory = async (req, res) => {
    let categoryData = await categoryModel.find({ categoryStatus: true }).select("categoryName")

    let obj = {
        status: 1,
        msg: "category Data",
        categoryData

    }
    res.send(obj)

}
let subCategoryData = async (req, res) => {
    let { parentid } = req.params;
    let subcateData = await productModel.
        find({ productStatus: true, parentCategory: parentid }).select("productName")
    obj = {
        status: 1,
        subcateData
    }

    res.send(obj)
}
let subsubCategoryData = async (req, res) => {
    let { subId } = req.params;
    let subsubcategoryData = await subsubcategoryModel.
        find({ subsubcategoryStatus: true, subCategoryData: subId })
        .select("subsubcategoryName")
    obj = {
        status: 1,
    subsubcategoryData
    }

    res.send(obj)
}


// let subsubCategoryData = async (req, res) => {
//     try {

//         let { subId } = req.params;

//         let productData = await subsubcategoryModel
//             .find({
//                 subproductStatus: true,
//                 subCategoryData: new mongoose.Types.ObjectId(subId)
//             })
//             .select("subproductName");

//         res.send({
//             status: 1,
//             productData
//         });

//     } catch (error) {
//         console.log(error);
//         res.send({
//             status: 0,
//             msg: "error in subsubCategoryData"
//         });
//     }
// };
let getColors = async (req, res) => {
    let ColorData = await colorModel
        .find({ colorStatus: true })
        .select("colorName")
    obj = {
        status: 1,
        ColorData
    }
    res.send(obj)
}
let materialdata = async (req, res) => {
    let mateData = await materialModel
        .find({ materialStatus: true })
        .select("materialName")

    obj = {
        status: 1,
        mateData
    }
    res.send(obj)
    let productdelete = async (req, res) => {

        let { id } = req.params;
        let obj
        productModel.deleteOne({ _id: id })
            .then((Delres) => {
                obj = {
                    status: 1,
                    msg: "product add",
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
    let productUpdate = async (req, res) => {
        let insertObj = req.body
        if (req.file) {
            if (req.file.filename) {
                insertObj.productImage = req.file.filename
            }
        }
        let { id } = req.params;

        try {
            let productRes = await productModel.updateOne(
                {
                    _id: id
                },
                {
                    $set: insertObj
                }
            )
            obj = {
                status: 1,
                msg: "product update successfully",
                productRes
            }
            res.send(obj)
        }
        catch (err) {
            let errorMessage
            if (err.code == 11000) {
                errorMessage: "product already exist"
            }
            if (err.errors) {
                if (err.errors.productName) {
                    errorMessage: err.errors.productName.message
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
        productModel.deleteMany({ _id: ids })
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
        let productData = await productModel.findOne({ _id: id })
        let obj = {
            status: 1,
            msg: "single data fetch successfully",
            productData
        }
        res.send(obj)
    }
    let substatusUpdate = async (req, res) => {
        let { ids } = req.body;
        let TstatusUpdate = await productModel.updateMany(
            { _id: ids },
            [
                {
                    $set: {
                        productStatus: {
                            $not: "$productStatus"
                        }
                    }
                }
            ])
        let obj = {
            status: 1,
            msg: "product status update successfully",
            TstatusUpdate

        }
        res.send(obj)
    }
}

let productdelete = async (req, res) => {

    let { id } = req.params;
    let obj
    productModel.deleteOne({ _id: id })
        .then((Delres) => {
            obj = {
                status: 1,
                msg: "product add",
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
let productUpdate = async (req, res) => {
    let insertObj = req.body
    if (req.file) {
        if (req.file.filename) {
            insertObj.productImage = req.file.filename
        }
    }
    let { id } = req.params;

    try {
        let productRes = await productModel.updateOne(
            {
                _id: id
            },
            {
                $set: insertObj
            }
        )
        obj = {
            status: 1,
            msg: "product update successfully",
            productRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage: "product already exist"
        }
        if (err.errors) {
            if (err.errors.productName) {
                errorMessage: err.errors.productName.message
            }
        }
        obj = {
            status: 0,
            errorMessage
        }
    }

}
let productMultidelete = (req, res) => {
    let { ids } = req.body;
    let obj
    productModel.deleteMany({ _id: ids })
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
let pcsingleData = async (req, res) => {
    let { id } = req.params;
    let productData = await productModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "single data fetch successfully",
        productData
    }
    res.send(obj)
}
let productstatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let TstatusUpdate = await productModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    productStatus: {
                        $not: "$productStatus"
                    }
                }
            }
        ])
    let obj = {
        status: 1,
        msg: "product status update successfully",
        TstatusUpdate

    }
    res.send(obj)
}
module.exports = {
    getParentcategory, subCategoryData, subsubCategoryData, getColors, materialdata, productView,productdelete,
    productCreate, productstatusUpdate, productMultidelete, pcsingleData, productUpdate, productdelete,
}