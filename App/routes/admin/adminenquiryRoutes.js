// // const express = require("express")
// // const router = express.Router()
// // const { getAllEnquiries, getEnquiry, updateEnquiryStatus, deleteEnquiry } = require("../../controllers/admin/enquiryController")

// // // Get all enquiries
// // router.get("/", getAllEnquiries)

// // // Get single enquiry
// // router.get("/:id", getEnquiry)

// // // Update enquiry status
// // router.put("/:id/status", updateEnquiryStatus)

// // // Delete enquiry
// // router.delete("/:id", deleteEnquiry)

// // module.exports = router
// const express = require("express");
// const router = express.Router();

// // Controller se functions import karein
// const { 
//     // EnquiryData,         // Form save karne ke liye
//     // getAllEnquiries,     // Sab dikhane ke liye
//     // getEnquiry,          // Ek inquiry check karne ke liye
//     // updateEnquiryStatus, // Status badalne ke liye
//     // deleteEnquiry        // Delete karne ke liye
// } = require("../../controllers/admin/enquiryController");

// // 1. POST Route: Jab user contact form bharega (Frontend)
// // URL: /api/enquiry/save-enquiry
// router.post("/save-enquiry", EnquiryData);

// // 2. GET Route: Admin panel mein saari list dikhane ke liye
// // URL: /api/enquiry/
// router.get("/", getAllEnquiries);

// // 3. GET Route: Kisi specific inquiry ki details ke liye
// // URL: /api/enquiry/:id
// router.get("/:id", getEnquiry);

// // 4. PUT Route: Inquiry ka status (1-Pending, 2-Resolved) update karne ke liye
// // URL: /api/enquiry/:id/status
// router.put("/:id/status", updateEnquiryStatus);

// // 5. DELETE Route: Inquiry remove karne ke liye
// // URL: /api/enquiry/:id
// router.delete("/:id", deleteEnquiry);


// module.exports = router;

const express = require("express");
const { enquiryCreate } = require("../../controllers/admin/enquiryController");
const adminenquiryRoutes = express.Router();

adminenquiryRoutes.post("/save-enquiry", enquiryCreate)


module.exports={adminenquiryRoutes}