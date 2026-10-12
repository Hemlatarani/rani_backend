let mongoose=require("mongoose")

let userSchema=mongoose.Schema(
    {
        userName:{
         required:[true,"user name is required"],
         type:String,
         minlength:2,
         maxlength:30,
         unique:true,
    
        },
        userEmail:String,
        userPhoneNumber:String,
        userPassword:String,
        userStatus:{
            type:Boolean,
            default:true
        }
    },
)
let userModel=mongoose.model("user",userSchema)
module.exports={userModel}