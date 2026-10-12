let mongoose=require("mongoose")

let orderSchema=new mongoose.Schema(
    {
        orderItem:[],
        shippingAddress:{
            type:Object
        },
        paymentMethod:{
            type:String,
            enum:["1","2"],
            default:"1"
        },
        email:{
            type:String,
            require:true
        },
        paymentStatus:{ 
            type:String,
            enum:["1","2"],
            default:"1"
        },
        razorpayOrderId:{
            type:String
        },
        razorpayPayment:{
            type:String,
        },
        orderAmount:{
            type:Number
        },
        orderQty:{
            type:Number
        },
        shippingCharges:{
            type:Number
        },
        orderStatus:{
            type:String,
            enum:["pending","process","completed"],
            default:"pending"
        },
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"user"
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("order", orderSchema);