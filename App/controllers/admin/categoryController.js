const { categoryModel } = require("../../models/categoryModel")
// let categoryCreate = async (req, res) => {
//     // console.log(req.body)
//     // console.log(req.file)
//     let insertObj = { ...req.body }
//     if (req.file) {
//         if (req.file.filename) {
//             insertObj['categoryImage'] = req.file.filename
//         }
//     }
//     try {
//         let categoryCollection = await categoryModel(insertObj)
//         let categoryRes = await categoryCollection.save()
//         // data insert save and insert dono se hoga
//         obj = {
//             status: 1,
//             msg: "category added",
//             categoryRes
//         }
//         res.send(obj)
//     }
//     catch (err) {
//         let errorMessage
//         if (err.code == 11000) {
//             errorMessage = "category already exists";
//         }
//         if (err.errors) {
//             if (err.errors.categoryName) {
//                 errorMessage = err.errors.categoryName.message;
//             }
//         }

//         obj = {
//             status: 0,
//             msg: "category not added",
//             errorMessage
//         }
//         res.send(obj)
//     }

// }


let categoryCreate = async (req, res) => {

    let categoryobj = { ...req.body }

    console.log('=== Category Create Request send hello  ===')
    console.log('Body:', req.body)
    console.log('File:', req.file)

    let obj

    if (req.file) {
        if (req.file.filename) {
            categoryobj.categoryImage = req.file.filename
        }
    }


    try {

        let SendData = await categoryModel.create(categoryobj)
        
        console.log('Category created successfully:', SendData)

        obj = {
            status: 1,
            msg: " category Added",
            SendData
        }

        return res.status(200).json(obj)


    }

    catch (err) {

        console.error('Category creation error:', err)

        let obj = {

            status: 0,
            msg: "Server Error",

        }


        if (err.name === "ValidationError") {

            obj.msg = "Check field value"

        }
        else if (err.code === 11000) {
            obj.msg = "Value Already Exits "

        }
        else if (err.name === "CastaError") {
            obj.msg = "Invalid data type"
        }

        return res.status(400).json(obj)


    }

}


let categoryView = async (req, res) => {
    let skip = 0
    let limit = 5

    if (req.query.limit) {
        limit = req.query.limit;

    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit

    }

    let categoryCollection = await categoryModel.find().skip(skip).limit(limit)
     let categorylength = await categoryModel.find()
    let obj = {
        status: 1,
        msg: "category view",
        staticPath: process.env.CATEGORYIMAGEPATH,
        categoryCollection,
        length: categorylength.length,
        totalpages: Math.ceil(categorylength.length / limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}
let categoryDelete = (req, res) => {

    let { id } = req.params;

    let obj
    categoryModel.deleteOne({ _id: id })
        .then((ApiRes) => {
            obj = {
                status: 1,
                msg: "category delete",
                ApiRes
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


let categoryUpdate = async (req, res) => {

    let { id } = req.params;
    let obj
    
    let updateObj = { ...req.body }
    
    if (req.file) {
        if (req.file.filename) {
            updateObj.categoryImage = req.file.filename
        }
    }
    
    try {
        let categoryRes = await categoryModel.updateOne(
            {
                _id: id
            },
            {
                $set: updateObj
            }
        )
        obj = {
            status: 1,
            msg: "update successfully",
            categoryRes
        }
        res.send(obj)
    }
    catch (err) {
        obj = {
            status: 0,
            msg: "Update failed",
            err
        }
        res.send(obj)
    }

}
let categoryMultidelete = (req, res) => {
    let { ids } = req.body;
    let obj
    categoryModel.deleteMany({ _id: ids })
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
let catsingleData = async (req, res) => {
    let { id } = req.params;
    let cateData = await categoryModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "single data fetch successfully",
        cateData
    }
    res.send(obj)
}
let categoryStatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let statusRes = await categoryModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    categoryStatus: {
                        $not: "$categoryStatus"
                    }
                }
            }
        ]
    )
    let obj = {
        status: 1,
        msg: "status updated sucessfully",
        statusRes
    }
    res.send(obj)
}

module.exports = {
    categoryCreate, categoryView, categoryUpdate,
    categoryDelete, categoryMultidelete, catsingleData, categoryStatusUpdate
}