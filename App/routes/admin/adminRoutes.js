let express=require("express");
const { colorRoutes } = require("./colorRoutes")
const { countryRoutes } = require("./countryRoutes")
const { materialRoutes } = require("./materialRoutes")
const { faqRoutes } = require("./FaqRoutes")
const { categoryRoutes } = require("./categoryRoutes")
const { sliderRoutes } = require("./sliderRoutes")
const { testimonialRoutes } = require("./testimonialRoutes")
const { wchooseRoutes } = require("./wchooseRoutes")
const { subcategoryRoutes } = require("./subcategoryRoutes")
const { subsubcategoryRoutes } = require("./subsubcategoryRoutes")
const { productRoutes } = require("./productRoutes")
const { adminauthRoutes } = require("./adminauthRoutes");
// const { adminenquiryRoutes } = require("./adminenquiryRoutes");
const { admincompanyRoutes } = require("./companyRoutes");
const { enquiryRoutes } = require("./enquiryRoutes");
const { orderRoutes } = require("./orderRoute");





let adminRoutes=express.Router()
// console.log("adminauthRoutes:", adminauthRoutes)
// console.log("colorRoutes:", colorRoutes)
// console.log("countryRoutes:", countryRoutes)
// console.log("materialRoutes:", materialRoutes)
// console.log("faqRoutes:", faqRoutes)
// console.log("categoryRoutes:", categoryRoutes)
// console.log("sliderRoutes:", sliderRoutes)
// console.log("testimonialRoutes:", testimonialRoutes)
// console.log("wchooseRoutes:", wchooseRoutes)
// console.log("subcategoryRoutes:", subcategoryRoutes)
// console.log("subsubcategoryRoutes:", subsubcategoryRoutes)
// console.log("productRoutes:", productRoutes)
// console.log("enquiryRoutes:", enquiryRoutes)
// console.log("admincompanyRoutes:", admincompanyRoutes)
// console.log("orderRoutes:", orderRoutes)

adminRoutes.use("/auth",adminauthRoutes)
adminRoutes.use("/color",colorRoutes)
adminRoutes.use("/country",countryRoutes)
adminRoutes.use("/material",materialRoutes)
adminRoutes.use("/faq",faqRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/slider",sliderRoutes)
adminRoutes.use("/testimonials",testimonialRoutes)
adminRoutes.use("/wchoose",wchooseRoutes)
adminRoutes.use("/subcategory",subcategoryRoutes)
adminRoutes.use("/subsubcategory",subsubcategoryRoutes)
adminRoutes.use("/product",productRoutes)
adminRoutes.use("/enquiry",enquiryRoutes)
adminRoutes.use("/company",admincompanyRoutes)
adminRoutes.use("/order",orderRoutes)









module.exports={adminRoutes}