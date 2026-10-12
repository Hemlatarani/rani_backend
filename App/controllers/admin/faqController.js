
const { faqModel } = require("../../models/faqModel")


let faqCreate = async (req, res) => {
    let obj
    try {
        let faqCollection = await faqModel(req.body)
        let faqRes = await faqCollection.save()
        obj = {
            status: 1,
            msg: "faqadd",
            faqRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "faqcode already exists";
        }
        if (err.errors) {
            if (err.errors.faqName)
                errorMessage = err.errors.faqName.message

        }
        obj = {
            status: 0,
            msg: "faqnot added",
            errorMessage

        }
        res.send(obj)

    }



}
// let obj
// try {
//     let faqCollection = await faqModel(req.body)
//     let faqRes = await faqCollection.save()
//     obj = {
//         status: 1,
//         msg: "faq add",
//         faqRes
//     }
//     res.send(obj)
// }
// catch (err) {
//     let errorMessage
//     if (err.code == 11000) {
//         errorMessage = "faq already exists"
//     }
//     if (err.errors) {
//         if (err.error.faqName){

//             errorMessage = err.error.faqName.message
//         }
//     }
//     let obj = {
//         status: 0,
//         msg: "faq not added",
//         errorMessage
//     }
//     res.send(obj)
// }



let faqView = async (req, res) => {

    let skip=0
    let limit=5

    if(req.query.limit){
        limit=req.query.limit
    }
    if(req.query.page){
        skip=(req.query.page-1)*limit
    }
    let faqCollection = await faqModel.find().skip(skip).limit(limit)
    let faqlength= await faqModel.find()

    let obj = {
        status: 1,
        msg: "faq view",
        faqCollection,
        length:faqlength.length,
        tpages:Math.ceil(faqlength.length/limit)

    }
    res.send(obj)
}

let faqDelete = async (req, res) => {

    let obj
    let { id } = req.params;
    faqModel.deleteOne({ _id: id })
        .then((delRes) => {
            obj = {
                status: 1,
                msg: "faq delete",
                delRes
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 1,
                msg: "faq delete",
                err
            }
            res.send(obj)
        })

}
let faqUpdate = async (req, res) => {
    let {id}=req.params;
    let obj
    try {
        let faqRes = await faqModel.updateOne(
            {
                _id:id
            },
            {
                $set:req.body
            }
        )
        obj = {
            status: 1,
            msg: "faq update",
            faqRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "faqcode updated";
        }
        if (err.errors) {
            if (err.errors.faqName)
                errorMessage = err.error.faqName.message

        }
        obj = {
            status: 0,
            msg: "faqnot added",
            errorMessage

        }
        res.send(obj)

    }
}
let faqmultidelete= (req,res)=>{

    let {ids}=req.body;
    console.log(ids)
    let obj
    faqModel.deleteMany({_id:ids})
    .then((delRes)=>{
        obj={
            status:1,
            msg:"many faq deleted",
            delRes
        }
        res.send(obj)
    })
    .catch((err)=>{
        obj={
            status:0,
            // msg:"many faq not deleted",
            err
        }
        res.send(obj)
    })
}

let singalData=async(req,res)=>{
    let {id}=req.params;
    let faqData=await faqModel.findOne({_id:id})
 let obj={
    status:1,
    faqData
 }
 res.send(obj)
}
let fstatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let faqUpdate = await faqModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    faqStatus: {
                        $not: "$faqStatus"
                    }
                }
            }
        ]
    )
    let obj = {
        status: 1,
        faqUpdate

    }
    res.send(obj)
}

module.exports = { faqCreate, faqView, faqDelete, faqUpdate,faqmultidelete,singalData,fstatusUpdate}