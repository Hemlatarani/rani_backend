let mongoose = require("mongoose")

let enquirySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        shipping_mobile_no: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
        },
        status: {
            type: String,
            enum: ["1", "2"],
            default: "1"
        }
    },
    {
        timestamps: true   // 🔥 createdAt, updatedAt automatically
    }
)


let enquiryModel=mongoose.model("Enq",enquirySchema)
module.exports = {enquiryModel }