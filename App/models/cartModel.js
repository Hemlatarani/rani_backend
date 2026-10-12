
let mongoose = require("mongoose")

let cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
        productNameId: String,
        productPrice: Number,
        productQty: Number,
        productImage: String,
        productTitle: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            require: true,
        }

    }
)
let cartModel = mongoose.model("cart", cartSchema)
module.exports = cartModel
