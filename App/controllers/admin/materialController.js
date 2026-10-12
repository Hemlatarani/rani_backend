const { materialModel } = require("../../models/materialModel")



let materialCreate = async (req, res) => {
    let obj
    try {
        let materialCollection = await materialModel(req.body)
        let materialRes = await materialCollection.save()
        obj = {
            status: 1,
            msg: "material add",
            materialRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "materialcode already exists";
        }
        if (err.errors) {
            if (err.errors.materialName)
                errorMessage = err.error.materialName.message

        }
        obj = {
            status: 0,
            msg: "materialnot added",
            errorMessage

        }
        res.send(obj)

    }
}
let materialView = async (req, res) => {

    let skip = 0
    let limit = 5

     if (req.query.limit) {
        limit=req.query.limit
    }
    if (req.query.page) {
        skip=(req.query.page - 1) * limit
    }
    let materialCollection = await materialModel.find().skip(skip).limit(limit)
    let materiallength = await materialModel.find()

    let obj = {
        status: 1,
        msg: "material view",
        materialCollection,
        length: materiallength.length,
        ttotalpage: Math.ceil(materiallength.length / limit)
    }
    res.send(obj)
}

let materialDelete = async (req, res) => {

    let obj
    let { id } = req.params;

    materialModel.deleteOne({ _id: id })

        .then((delRes) => {
            obj = {
                status: 1,
                msg: "material delete",
                delRes
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 1,
                msg: "material delete",
                err

            }
            res.send(obj)
        })

}
let materialUpdate = async (req, res) => {

    let { id } = req.params;
    let obj
    try {
        let materialRes = await materialModel.updateOne(
            {
                _id: id
            },
            {
                $set: req.body
            }
        )
        obj = {
            status: 1,
            msg: "material update",
            materialRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "materialcode updated";
        }
        if (err.errors) {
            if (err.errors.materialName)
                errorMessage = err.error.materialName.message

        }
        obj = {
            status: 0,
            msg: "materialnot added",
            errorMessage

        }
        res.send(obj)

    }
}
// let materialmultidelete= (req,res)=>{

//     let {ids}=req.body;
//     let obj
//     materialModel.deleteMany({_id:ids})
//     .then((delRes)=>{
//         obj={
//             status:1,
//             msg:"many material deleted",
//             delRes
//         }
//         res.send(obj)
//     })
//     .catch((err)=>{
//         obj={
//             status:0,
//             // msg:"many material not deleted",
//             err
//         }
//     })

// }
let materialMultidelete = (req, res) => {

    let { ids } = req.body;
    let obj
    materialModel.deleteMany({ _id: ids })
        .then((delRes) => {
            obj = {
                status: 1,
                msg: "many material deleted",
                delRes
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 0,
                // msg:"many material not deleted",
                err
            }
            res.send(obj)
        })
}

let materialSingleData = async (req, res) => {
    let { id } = req.params;
    let materialData = await materialModel.findOne({ _id: id })
    let obj = {
        status: 1,
        materialData
    }
    res.send(obj)
}
let MstatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let materialUpdate = await materialModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    materialStatus: {
                        $not: "$materialStatus"
                    }
                }
            }
        ]
    )
    let obj = {
        status: 1,
        materialUpdate

    }
    res.send(obj)
}
module.exports = { materialCreate, materialView, materialDelete, materialUpdate, materialMultidelete, materialSingleData, MstatusUpdate }