let mongoose = require("mongoose")
let testiSchema = mongoose.Schema(
    {
        testiName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },
        testiDesignation: String,
        testiRating:Number,
        testiImage: String,
        testiOrder: Number,
        testiMessage:String,
        testiStatus: {
            type: Boolean,
            default: true
        }
    }
)
let testiModel = mongoose.model("testi", testiSchema)
module.exports = { testiModel }