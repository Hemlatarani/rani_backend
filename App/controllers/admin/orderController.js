const orderModel = require("../../models/orderModel")

let getviewOrder= async(req,res)=>{

    let viewadmin=await orderModel.find() // mene filter hataya admin sabki orders dekhega
    console.log("view admin",viewadmin)
    let obj={
        status:1,
        msg:" order successfully",
        viewadmin
    }
    res.send(obj)
}

let getOrderDetail = async(req,res)=>{ // mene naya controller banaya single order detail ke liye
    let id = req.params.id // params se id le raha hoon
    let orderDetail = await orderModel.findById(id)
    res.send({ status:1, msg:"order detail", orderDetail })
}

module.exports={getviewOrder, getOrderDetail}