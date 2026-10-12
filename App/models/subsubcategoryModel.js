const { populate } = require("dotenv")
let mongoose = require("mongoose")
let subsubcategorySchema = mongoose.Schema(
    {
        subsubcategoryName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        },
        subCategoryData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subcategory"
        },
        subsubcategoryImage: String,
        subsubcategoryOrder: Number,
        subsubcategoryStatus: {
            type: Boolean,
            default: true
        }
    }
)
let subsubcategoryModel = mongoose.model("subsubcategory", subsubcategorySchema)
module.exports = { subsubcategoryModel }