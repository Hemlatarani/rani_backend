const { testiModel } = require("../../models/testiModel")

let testimonalCreate= async(req,res)=>{
    let insertObj={...req.body}
    //console.log(insertObj)
    if(req.file){
        if(req.file.filename){
            insertObj['testiImage']=req.file.filename
            //console.log(req.file)
        }
    }    
      try {
        let testiCollection = await testiModel(insertObj)
        let testiRes = await testiCollection.save()
        // data insert save and insert dono se hoga
        obj = {
            status: 1,
            msg: "testi add",
            testiRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "testi already exists";
        }
        if (err.errors) {
            if (err.errors.testiName) {
                errorMessage = err.errors.testiName.message;
            }
        }

        obj = {
            status: 0,
            msg: "testi not added",
            errorMessage
        }
        res.send(obj)
    }
   
}

let testiView= async(req,res)=>{
    let skip=0
    let limit=5
    if(req.query.limit){
        limit=req.query.limit
    }
    if(req.query.page){
        skip=(req.query.page -1)*limit
    }


 let testiCollection=await testiModel.find().skip(skip).limit(limit)
 let testiLenght=await testiModel.find()
 let obj={
    status:1,
    msg:'testi view',
    testiCollection,
    staticPath:process.env.TESTIMONIALSIMAGEPATH,
    length:testiLenght.length,
    totalpages:Math.ceil(testiLenght.length/limit)
 }
 res.send(obj)

}

let testidelete=async(req,res)=>{
    let {id}=req.params;
    let obj
     testiModel.deleteOne({_id:id})
     .then((Delres)=>{
obj={
    status:1, 
    msg:"testi delete successfully",
Delres
}
res.send(obj)
     })
     .catch((err)=>{
        status:0,
        err
     })
     res.send(obj)
}
let testiUpdate=async(req,res)=>{
    let {id}=req.params;
    let obj
    try{
 let testiRes=await testiModel.updateOne(
        {
            _id:id
        },
        {
            $set:req.body
        }
    )
    obj={
        status:1,
        msg:"testi update successfully",
        testiRes
    }
    res.send(obj)
    }
    catch(err) {
         let errorMessage
          if(err.code ==11000){
            errorMessage:"testi already exist"
          }
          if(err.errors){
            if(err.errors.testiName){
                errorMessage:err.errors.testiName.message
            }
          }
          obj={
            status:0,
            errorMessage
          }
    }
   
}
let testiMultidelete=(req,res)=>{
let {ids}=req.body;
let obj
  testiModel.deleteMany({_id:ids})
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
let tsingleData =async(req,res)=>{
    let {id}=req.params;
    let testiData=await testiModel.findOne({_id:id})
    let obj={
        status:1,
        msg:"single data fetch successfully",
        testiData
    }
    res.send(obj)
}
let tstatusUpdate= async(req,res)=>{
    let {ids}=req.body;
    let TstatusUpdate=await testiModel.updateMany(
        {_id:ids},
    [
        {
            $set:{
                testiStatus:{
                    $not:"$testiStatus"
                }
            }
        }
    ])
    let obj={
        status:1,
        msg:"testi status update successfully",
        TstatusUpdate

    }
    res.send(obj)
}
module.exports={testimonalCreate,testiView,testidelete,testiUpdate,testiMultidelete,tsingleData,tstatusUpdate}
