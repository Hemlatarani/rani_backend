let express = require("express")
const multer = require('multer')
const { subsubcategoryCreate, subsubcategoryView, parentCategory, subsubcategorydelete, scsingleData, subsubcategoryUpdate, subsubstatusUpdate, sbucategoryMultidelete, subsubCategory, subCategory, subCategoryData } = require("../../controllers/admin/subsubcateController")
let subsubcategoryRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/subsubcategory')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
subsubcategoryRoutes.post("/create", upload.single('subsubcategoryImage'), subsubcategoryCreate)
subsubcategoryRoutes.get("/view", subsubcategoryView)
subsubcategoryRoutes.get("/parent-category", parentCategory)
subsubcategoryRoutes.get("/sub-category/:parentid",subCategoryData)
subsubcategoryRoutes.delete("/delete/:id", subsubcategorydelete)
subsubcategoryRoutes.get("/edit-subsubcategory/:id", scsingleData)
subsubcategoryRoutes.put("/update/:id",upload.single("subsubcategoryImage"),subsubcategoryUpdate)
subsubcategoryRoutes.put("/status-update", subsubstatusUpdate)
subsubcategoryRoutes.post("/multi-delete", sbucategoryMultidelete)

module.exports = { subsubcategoryRoutes }