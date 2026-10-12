let mongoose = require("mongoose")
let adminSchema = mongoose.Schema(
    {
        adminEmail: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },
        adminPassword: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
        },


    }
)
let adminModel = mongoose.model("admin", adminSchema)
module.exports = { adminModel }