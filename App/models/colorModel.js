let mongoose=require("mongoose")
let colorSchema=mongoose.Schema(
    {
        colorName:{
            type:String,
            required:[true,"color is required"],
            minlength:2,
            maxlength:30,
            unique:true,
        
        },
        colorCode:{
            type:String,
            minlength:1,
            maxlength:30,
        },
        colorOrder:Number,
        colorStatus:{
            type:Boolean,
            default:true
        }
    }
)
let colorModel=mongoose.model("color",colorSchema)
module.exports={colorModel}