let express = require("express")
const { materialCreate, materialView, materialDelete, materialUpdate, materialMultidelete, materialSingleData, MstatusUpdate } = require("../../controllers/admin/materialController")
let materialRoutes = express.Router()

materialRoutes.post("/create",materialCreate)
materialRoutes.get("/view",materialView)
materialRoutes.delete("/delete/:id",materialDelete)
materialRoutes.post("/multi-delete",materialMultidelete)
materialRoutes.post("/status-update",MstatusUpdate)

materialRoutes.get("/edit-material/:id",materialSingleData)
materialRoutes.put("/update/:id",materialUpdate)


module.exports={materialRoutes}