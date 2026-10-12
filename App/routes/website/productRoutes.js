let express=require("express")
const { productDetails, topratedData } = require("../../controllers/web/productCartController")
let productRoutes =express.Router()

productRoutes.get("/product-details/:slug",productDetails)
productRoutes.get("/top-rated",topratedData)
module.exports={productRoutes}