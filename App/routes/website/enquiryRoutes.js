const express = require("express");
const { submitEnquiry, getAllEnquiries } = require("../../controllers/web/enquiryController")
const enquiryRoutes = express.Router()

// Submit contact form
enquiryRoutes.post("/save-enquiry", submitEnquiry)
enquiryRoutes.get("/get-enquiry",getAllEnquiries)

module.exports ={enquiryRoutes}