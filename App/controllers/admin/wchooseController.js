const { wchooseModelNew } = require("../../models/wchooseModel")


let wchooseCreate = async (req, res) => {
    let insertObj = { ...req.body }
    if (req.file) {
        if (req.file.filename) {
            insertObj['chooseImageNew'] = req.file.filename
        }
    }



    try {
        let wchooseCollection = await wchooseModelNew(insertObj)
        let wchooseRes = await wchooseCollection.save()
        // data insert save and insert dono se hoga
        obj = {
            status: 1,
            msg: "wchoose add",
            wchooseRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "wchoose already exists";
        }
        if (err.errors) {
            if (err.errors.wchooseName) {
                errorMessage = err.errors.wchooseName.message;
            }
        }

        obj = {
            status: 0,
            msg: "wchoose not added",
            errorMessage
        }
        res.send(obj)
    }

}

let wchooseView = async (req, res) => {
    let skip = 0
    let limit = 5

    if (req.query.limit) {
        limit = req.query.limit;

    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit

    }

    let wchooseCollection = await wchooseModelNew.find().skip(skip).limit(limit)
    let wchooselength = await wchooseModelNew.find()
    let obj = {
        status: 1,
        msg: "wchoose view",
        staticPath: process.env.WCHOOSEIMAGEPATH,
        wchooseCollection,
        length: wchooselength.length,
        totalpages: Math.ceil(wchooselength.length / limit)//math.ceil ka work number ko complete krna 

    }
    res.send(obj)
}
let whydelete=async(req,res)=>{
    let {id}=req.params;
    let obj
    try{
let whyRes=await wchooseModelNew.deleteOne({_id:id})
    obj={
        status:1,
        msg:"wchoose deleted successfully",
        whyRes
    }
    res.send(obj)
    }
    catch(err){
status:0,
err
    }
    
}



let whyUpdate=async(req,res)=>{
    let {id}=req.params;
    let obj
    try{
 let whyRes=await whyModel.updateOne(
        {
            _id:id
        },
        {
            $set:req.body
        }
    )
    obj={
        status:1,
        msg:"why update successfully",
        whyRes
    }
    res.send(obj)
    }
    catch(err) {
         let errorMessage
          if(err.code ==11000){
            errorMessage:"why already exist"
          }
          if(err.errors){
            if(err.errors.whyName){
                errorMessage:err.errors.whyName.message
            }
          }
          obj={
            status:0,
            errorMessage
          }
    }
   
}
let whyMultidelete=(req,res)=>{
let {ids}=req.body;
let obj
  whyModel.deleteMany({_id:ids})
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
let wsingleData =async(req,res)=>{
    let {id}=req.params;
    let chooseData=await wchooseModelNew.findOne({_id:id})
    let obj={
        status:1,
        msg:"single data fetch successfully",
        chooseData
    }
    res.send(obj)
}
let wstatusUpdate=async(req,res)=>{
    let {ids}=req.body;
    let statusRes=await wchooseModelNew.updateMany(
        {_id:ids},
        [
            {
                 $set: {
            wchooseStatusNew: {
                $not: "$wchooseStatusNew"
            }
        }
            }
        ]
    )
    let obj={
        status:1,
        msg:"status updated sucessfully",
        statusRes
    }
    res.send(obj)
}
module.exports = { wchooseCreate, wchooseView,whydelete,whyUpdate,whyMultidelete, wsingleData,wstatusUpdate}