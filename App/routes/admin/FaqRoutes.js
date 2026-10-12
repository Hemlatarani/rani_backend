let express = require("express")
const { faqCreate, faqView, faqDelete, faqUpdate, faqmultidelete, singalData, fstatusUpdate } = require("../../controllers/admin/faqController")
let faqRoutes=express.Router()

faqRoutes.post("/create",faqCreate)
faqRoutes.get("/view",faqView)
faqRoutes.delete("/delete/:id",faqDelete)
faqRoutes.post("/multi-delete",faqmultidelete)
faqRoutes.post("/status-update",fstatusUpdate)
faqRoutes.get("/edit-faq/:id",singalData)
faqRoutes.put("/update/:id",faqUpdate)

module.exports={faqRoutes}