let mongoose = require("mongoose")
let categorySchema = mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
            unique: true,
        },

        categoryImage: String,
        categoryOrder: Number,
        categoryStatus: {
            type: Boolean,
            default: true
        }
    }
)
let categoryModel = mongoose.model("category", categorySchema)
module.exports = { categoryModel }