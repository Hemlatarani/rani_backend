const { categoryModel } = require("../../models/categoryModel")
const { subcategoryModel } = require("../../models/subcategoryModel")
const { subsubcategoryModel } = require("../../models/subsubcategoryModel")
let mongoose = require("mongoose")
let subsubcategoryCreate = async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    let insertObj = { ...req.body }
    if (req.file) {
        if (req.file.filename) {
            insertObj['subsubcategoryImage'] = req.file.filename
        }
    }
    console.log(insertObj)
    try {
        let subsubcategoryCollection = await subsubcategoryModel(insertObj)
        let subsubcategoryRes = await subsubcategoryCollection.save()
        // data insert save and insert dono se hoga
        // console.log(subsubcategoryRes)
        obj = {
            status: 1,
            msg: "subsubcategory add",
            subsubcategoryRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "subsubcategory already exists";
        }
        if (err.errors) {
            if (err.errors.subsubcategoryName) {
                errorMessage = err.errors.subsubcategoryName.message;
            }
        }

        obj = {
            status: 0,
            msg: "subsubcategory not added",
            errorMessage
        }
        res.send(obj)
    }

}

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
        if (req.file.filename) {
            insertObj['subsubcategoryImage'] = req.file.filename
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