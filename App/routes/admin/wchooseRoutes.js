let express = require("express")

const multer = require('multer')
const { wchooseCreate, wchooseView, whydelete, whyUpdate, whyMultidelete, singleData, wsingleData, wstatusUpdate } = require("../../controllers/admin/wchooseController")
let wchooseRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/wchoose")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


wchooseRoutes.post("/create",upload.single('chooseImage'),wchooseCreate )
wchooseRoutes.get("/view", wchooseView)
wchooseRoutes.delete("/delete/:id",whydelete)
wchooseRoutes.get("/edit-wchoose/:id",wsingleData)
wchooseRoutes.put("/update/:id",whyUpdate)
wchooseRoutes.post("/multi-delete",whyMultidelete)
wchooseRoutes.put("/status-update",wstatusUpdate)




module.exports={wchooseRoutes}