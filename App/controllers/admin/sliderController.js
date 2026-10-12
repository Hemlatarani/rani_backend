const { sliderModel } = require("../../models/sliderModel")


let sliderCreate = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    let insertObj = { ...req.body }
    if (req.file) {
        if (req.file.filename) {
            insertObj['sliderImage'] = req.file.filename
        }
    }

    console.log(insertObj)
    try {
        let sliderCollection = await sliderModel(insertObj)
        let sliderRes = await sliderCollection.save()
        // data insert save and insert dono se hoga
        obj = {
            status: 1,
            msg: "slider add",
            sliderRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "slider already exists";
        }
        if (err.errors) {
            if (err.errors.sliderName) {
                errorMessage = err.errors.sliderName.message;
            }
        }

        obj = {
            status: 0,
            msg: "slider not added",
            errorMessage
        }
        res.send(obj)
    }

}

let sliderView = async (req, res) => {
    let skip = 0
    let limit = 5

    if (req.query.limit) {
        limit = req.query.limit;

    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit

    }

    let sliderCollection = await sliderModel.find().skip(skip).limit(limit)
    sliderlength = await sliderModel.find()
    let obj = {
        status: 1,
        msg: "slider view",
        staticPath: process.env.SLIDERIMAGEPATH,
        sliderCollection,
        length: sliderlength.length,
        totalpages: Math.ceil(sliderlength.length / limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}


let sliderDelete = async (req, res) => {
    let { id } = req.params;
    let obj
    sliderModel.deleteOne({ _id: id })
        .then((ApiRes) => {
            obj = {
                status: 1,
                msg: "slider delete",
                ApiRes
            }

            res.send(obj)
        })
        .catch((err) => {
            obj => {
                status: 0,
                    err

            }
            res.send(obj)
        })

}
let sliderUpdate=async(req,res)=>{
    let {id}=req.params;
    let obj
    try{
 let sliderRes=await sliderModel.updateOne(
        {
            _id:id
        },
        {
            $set:req.body
        }
    )
    obj={
        status:1,
        msg:"slider update successfully",
        sliderRes
    }
    res.send(obj)
    }
    catch(err) {
         let errorMessage
          if(err.code ==11000){
            errorMessage:"slider already exist"
          }
          if(err.errors){
            if(err.errors.sliderName){
                errorMessage:err.errors.sliderName.message
            }
          }
          obj={
            status:0,
            errorMessage
          }
    }
   
}
let sliderMultidelete=(req,res)=>{
let {ids}=req.body;
let obj
  sliderModel.deleteMany({_id:ids})
 .then((delRes)=>{
    obj={
        status:1,
        msg:"multidelete successfully",
        delRes
    }
    res.send(obj)
 })
 .catch((err)=>{
    obj={
        status:0,
        err
    }
    res.send(obj)
 })
}
let slsingleData =async(req,res)=>{
    let {id}=req.params;
    let sliderData=await sliderModel.findOne({_id:id})
    let obj={
        status:1,
        msg:"single data fetch successfully",
        sliderData
    }
    res.send(obj)
}
let sstatusUpdate= async(req,res)=>{
    let {ids}=req.body;
    let SstatusUpdate=await sliderModel.updateMany(
        {_id:ids},
    [
        {
            $set:{
                sliderStatus:{
                    $not:"$sliderStatus"
                }
            }
        }
    ])
    let obj={
        status:1,
        msg:"slider status update successfully",
        SstatusUpdate

    }
    res.send(obj)
}


module.exports = { sliderCreate, sliderView, sliderDelete,sliderUpdate,sliderMultidelete, slsingleData,sstatusUpdate }