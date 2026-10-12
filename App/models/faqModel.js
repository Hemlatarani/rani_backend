let mongoose=require("mongoose")
let faqSchema=mongoose.Schema(
    {
        faqName:{
            type:String,
            required:[true,"faq is required"],
            minlength:2,
            maxlength:30,
            unique:true,
        
        },
        faqCode:{
            type:String,
            minlength:1,
            maxlength:30,
        },
        faqOrder:Number,
        faqStatus:{
            type:Boolean,
            default:true
        }
    }
)
let faqModel=mongoose.model("faq",faqSchema)
module.exports={faqModel}