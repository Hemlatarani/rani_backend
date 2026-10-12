let express = require("express")
const { countryCreate, countryView, countryDelete, countryUpdate, countryMultidelete, singalData, cstatusUpdate } = require("../../controllers/admin/countryController")
let countryRoutes = express.Router()

countryRoutes.post("/create",countryCreate)
countryRoutes.get("/view",countryView)
countryRoutes.delete("/delete/:id",countryDelete)
countryRoutes.post("/multi-delete",countryMultidelete)
countryRoutes.post("/status-update",cstatusUpdate)
countryRoutes.get("/edit-country/:id",singalData)
countryRoutes.put("/update/:id",countryUpdate)




module.exports={countryRoutes}