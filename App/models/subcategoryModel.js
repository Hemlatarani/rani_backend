const { populate } = require("dotenv")
let mongoose = require("mongoose")
let subcategorySchema = mongoose.Schema(
    {
        subcategoryName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"category"
        },
        subcategoryImage: String,
        subcategoryOrder: Number,
        subcategoryStatus: {
            type: Boolean,
            default: true
        }
    }
)
let subcategoryModel = mongoose.model("subcategory", subcategorySchema)
module.exports = { subcategoryModel }