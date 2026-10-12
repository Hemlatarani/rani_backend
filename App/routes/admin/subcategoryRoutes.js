let express = require("express")
const multer = require('multer')

const { subcategoryCreate, subcategoryView, parentCategory, subcategorydelete, subcategoryUpdate, sbucategoryMultidelete, scsingleData, substatusUpdate } = require("../../controllers/admin/subcategoryController")

let subcategoryRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/subcategory")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


subcategoryRoutes.post("/create", upload.single('subcategoryImage'), subcategoryCreate)
subcategoryRoutes.get("/view", subcategoryView)
subcategoryRoutes.get("/parent-category", parentCategory)
subcategoryRoutes.delete("/delete/:id",subcategorydelete)
subcategoryRoutes.get("/edit-subcategory/:id",scsingleData)
subcategoryRoutes.put("/update/:id",upload.single("subcategoryImage"),subcategoryUpdate)
subcategoryRoutes.put("/status-update",substatusUpdate)
subcategoryRoutes.post("/multi-delete",sbucategoryMultidelete)
// subcategoryRoutes.delete("/delete",subcategoryDelete)


module.exports = { subcategoryRoutes }