let express=require("express")
const { colorCreate, colorView, colorDelete, colorUpdate, colorMultidelete, singalData, statusUpdate } = require("../../controllers/admin/colorcontroller")

let colorRoutes=express.Router()

colorRoutes.post("/create",colorCreate)
colorRoutes.get("/view",colorView)
colorRoutes.delete("/delete/:id",colorDelete)
colorRoutes.post("/multi-delete",colorMultidelete)
colorRoutes.post("/status-update",statusUpdate)
colorRoutes.get("/edit-color/:id",singalData)

colorRoutes.put("/update/:id",colorUpdate)

module.exports={colorRoutes}