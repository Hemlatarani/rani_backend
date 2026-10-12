let mongoose = require("mongoose")
let wchooseSchemaNew = mongoose.Schema(
    {
        chooseNameNew: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },
        chooseImageNew: String,
        chooseOrderNew: Number,
        chooseMessageNew: String,
        wchooseStatusNew: {
            type: Boolean,
            default: true
        }
    }
)
let wchooseModelNew = mongoose.model("whyChooseusNew", wchooseSchemaNew)
module.exports = { wchooseModelNew }