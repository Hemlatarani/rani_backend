let express=require("express")
const { getEnquiry } = require("../../controllers/admin/enquiryController")

let enquiryRoutes=express.Router()

enquiryRoutes.get("/get-enquiry",getEnquiry)

module.exports={enquiryRoutes}