let express=require("express");
const { adminLogin, adminchangePassword, verifyadminid } = require("../../controllers/admin/adminauthController")
let adminauthRoutes=express.Router()

let multer=require("multer")
let upload=multer()
adminauthRoutes.post("/login",upload.none(),adminLogin)
adminauthRoutes.put("/change-password/:id",upload.none(),adminchangePassword)
adminauthRoutes.put("/verify-admin/:id",upload.none(),verifyadminid)

module.exports={adminauthRoutes}