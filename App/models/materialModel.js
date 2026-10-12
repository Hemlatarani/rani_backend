let mongoose=require("mongoose")
let materialSchema=mongoose.Schema(
    {
        materialName:{
            type:String,
            required:[true,"material is required"],
            minlength:2,
            maxlength:30,
            unique:true,
        },
    materialCode:{
            type:String,
            minlength:1,
            maxlength:30,
        },
        
        materialOrder:Number,
        materialStatus:{
            type:Boolean,
            default:true
        }
    }
)
let materialModel=mongoose.model("Materials",materialSchema)
module.exports={materialModel}