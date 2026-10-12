 let express=require("express")
 let multer=require("multer")
const {UpdatCompanydata, createCompany, getcompanydata, } = require("../../controllers/admin/companyController")

 let admincompanyRoutes=express.Router()

 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
     cb(null,"uploads/")
     },
     filename: function (req, file, cb) {
         cb(null, Date.now() + file.originalname)
     }
 })
 const upload = multer({ storage: storage })
 

admincompanyRoutes.post("/save", upload.single("imageLogo"), createCompany);
admincompanyRoutes.put("/update/:id", upload.single("imageLogo"), UpdatCompanydata);
admincompanyRoutes.get("/getComdata",getcompanydata)

 module.exports={admincompanyRoutes}