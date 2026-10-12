let mongoose = require("mongoose")
let sliderSchema = mongoose.Schema(
    {
        sliderName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },

        sliderImage: String,
        sliderOrder: Number,
        sliderStatus: {
            type: Boolean,
            default: true
        }
    }
)
let sliderModel = mongoose.model("slider", sliderSchema)
module.exports = { sliderModel }