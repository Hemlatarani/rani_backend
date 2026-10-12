const { colorModel } = require("../../models/colorModel")

let colorCreate = async (req, res) => {
    // let colorRes=await colorModel.insertOne(insertObj)
    let obj
    try {
        let colorCollection = await colorModel(req.body)
        let colorRes = await colorCollection.save()
        // data insert save and insert dono se hoga
        obj = {
            status: 1,
            msg: "color add",
            colorRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "color already exists";
        }
        if (err.errors) {
            if (err.errors.colorName) {
                errorMessage = err.errors.colorName.message;
            }
        }

        obj = {
            status: 0,
            msg: "color not added",
            errorMessage
        }
        res.send(obj)
    }


}

let colorView = async (req, res) => {
let skip=0
let limit=5

if(req.query.limit){
    limit=req.query.limit;

}

if(req.query.page){
    skip=(req.query.page-1)*limit

}
let searchObj={}
if(req.query.searchTitle){
    // searchObj=["colorName"]={
        // $regex:req.query.searchTitle,
        // $option:"i"

        //case insensitive ke liye use hota h 
    // }
    searchObj={
        $or:[
            {colorName:{$regex:req.query.searchTitle,$options:"i"}},
            
            {colorCode:{$regex:req.query.searchTitle,$options:"i"}}
        ]
    }
}

    let colorCollection = await colorModel.find(searchObj).skip(skip).limit(limit)
    colorlength= await colorModel.find(searchObj)
    let obj = {
        status: 1,
        msg: "color view",
        colorCollection,
        length:colorlength.length,
        totalpages: Math.ceil(colorlength.length/limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}

let colorDelete = (req, res) => {

    let { id } = req.params;

    let obj
    colorModel.deleteOne({ _id: id })
        .then((ApiRes) => {
            obj = {
                status: 1,
                msg: "color delete",
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
let colorUpdate = async (req, res) => {
    let { id } = req.params;
    let obj
    try {
        let colorRes = await colorModel.updateOne(
            {
                _id: id
            },
            {
                $set: req.body
            }
        )
        obj = {
            status: 1,
            msg: "color update",
            colorRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "colorcode updated";
        }
        if (err.errors) {
            if (err.errors.colorName)
                errorMessage = err.error.colorName.message

        }
        obj = {
            status: 0,
            msg: "color not added",
            errorMessage

        }
        res.send(obj)

    }
}

const colorMultidelete = (req, res) => {
    let { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send({
            status: 0,
            msg: "Please provide an array of country IDs to delete."
        });
    }

    colorModel.deleteMany({ _id: { $in: ids } })
        .then((delRes) => {
            res.status(200).send({
                status: 1,
                msg: "Countries deleted successfully.",
                delRes
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                msg: "Error deleting countries.",
                error: err
            });
        });

};
let singalData = async (req, res) => {
    let { id } = req.params;
    let colorData = await colorModel.findOne({ _id: id })
    let obj = {
        status: 1,
        colorData
    }
    res.send(obj)

}
let statusUpdate = async (req,res) => {
    let { ids } = req.body;
    let updateRes = await colorModel.updateMany( 
        { _id: ids },
    [{
        $set: {
            colorStatus: {
                $not: "$colorStatus"
            }
        }
    }]
)
   
let obj={
    status:1,
    msg:"status update",
    updateRes
}
res.send(obj)

}
module.exports = { colorCreate, colorView, colorDelete, colorUpdate, colorMultidelete, singalData, statusUpdate }