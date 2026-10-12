let express=require("express");
const { userAuthRoutes } = require("./userAuthRoutes")
const { homeRoutes } = require("./homeRoutes")
const { cartRoutes } = require("./cartRoutes")
const { productRoutes } = require("./productRoutes")
const { orderRoutes } = require("./orderRoutes");
const { enquiryRoutes } = require("./enquiryRoutes");
const { webcompanyRoutes } = require("./companyRoutes");





 
let webRoutes=express.Router()


webRoutes.use("/user",userAuthRoutes)
webRoutes.use("/home",homeRoutes)
webRoutes.use("/cart",cartRoutes)
webRoutes.use("/product",productRoutes)
webRoutes.use("/order",orderRoutes)
webRoutes.use("/enquiry",enquiryRoutes)
webRoutes.use("/company-profile",webcompanyRoutes)





// console.log({
//   userAuthRoutes,
//   homeRoutes,
//   cartRoutes,
//   productRoutes,
//   orderRoutes,
//   enquiryRoutes,
//   companyRoutes
// })





module.exports={webRoutes}