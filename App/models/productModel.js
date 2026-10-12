const { populate } = require("dotenv")
// let mongoose = require("mongoose")
// let productSchema = mongoose.Schema(
//     {
//         productName: {
//             type: String,
//             required: true,
//             minlength: 2,
//             maxlength: 30,
//             // unique: true,
//         },

//         parentCategory: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "category"
//         },
//         subCategoryData: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "subcategory"
//         },
//         subsubCategoryData: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "subsubcategory"
//         },
//         productMaterial: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "material"
//         }],
//         productColor: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "color"
//         }],
//         productType: {
//             type:String,
//             enum:['Featured','New Arrivals','Onsale','Best Selling','Premium','Exclusive','Hot Deal','Flash Sale']
//             //enum is a special data type in programming that creates a set of related, named constants
//         },
//         productGallery:Object,
//         backImage:String,
//         isSelling:{
//             type: Boolean,
//             default: false
//         } ,
//         topRated:{
//             type: Boolean,
//             default: false
//         } , 
//         isUpsell:{
//             type: Boolean,
//             default: false
//         } , 
//         actulPrice: Number,
//         salePrice: Number,
//         isStock:Number,
//         productImage: String,
//         productOrder: Number,
//         productDesc: String,
//         slug:String,
//         productStatus: {
//             type: Boolean,
//             default: true
//         }
//     }
// )
// let productModel = mongoose.model("product", productSchema)
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },

    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },

    subCategoryData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },

    subsubCategoryData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subsubcategory"
    },

    productMaterial: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "material"
    }],

    productColor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "color"
    }],

    productType: {
        type: String,
        enum: [
            "Featured",
            "New Arrivals",
            "Onsale",
            "Best Selling",
            "Premium",
            "Exclusive",
            "Hot Deal",
            "Flash Sale"
        ]
    },

    productGallery: Object,

    backImage: String,

    isSelling: {
        type: Boolean,
        default: false
    },

    topRated: {
        type: Boolean,
        default: false
    },

    isUpsell: {
        type: Boolean,
        default: false
    },

    actulPrice: Number,

    salePrice: Number,

    isStock: Number,

    productImage: String,

    productOrder: Number,

    productDesc: String,

    slug: String,

    productStatus: {
        type: Boolean,
        default: true
    }
});

const productModel = mongoose.model("product", productSchema);
module.exports = { productModel }