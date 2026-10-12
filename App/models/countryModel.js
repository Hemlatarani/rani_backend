let mongoose=require("mongoose")
let countrySchema=mongoose.Schema(
    {
        countryName:{
            type:String,
            required:[true,"country is required"],
            minlength:2,
            maxlength:30,
            unique:true,
        
        },
        countryCode:{
            type:String,
            minlength:1,
            maxlength:30,
        },
        countryOrder:Number,
        countryStatus:{
            type:Boolean,
            default:true
        }
    }
)
let countryModel=mongoose.model("country",countrySchema)
module.exports={countryModel}