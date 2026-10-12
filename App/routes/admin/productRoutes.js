let express = require("express")
const multer = require("multer")
const { getParentcategory, subCategoryData, subsubCategoryData, getColors, materialdata, productCreate, productView, productdelete, pcsingleData, productUpdate, productstatusUpdate, productMultidelete, } = require("../../controllers/admin/productController")

let productRoutes = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
productRoutes.post("/create", upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 },
    // { name: 'productGallery',maxCount:20 },
    { name: 'galleryImage', maxCount: 20 },
]), productCreate)

productRoutes.get("/parent-category", getParentcategory)
productRoutes.get("/sub-category/:parentid", subCategoryData)
productRoutes.get("/sub-subcategory/:subId", subsubCategoryData)
productRoutes.get("/colors", getColors)
productRoutes.get("/material", materialdata)
productRoutes.get("/view", productView)
productRoutes.get("/parent-category", getParentcategory)
productRoutes.delete("/delete/:id", productdelete)
productRoutes.get("/edit-product/:id", pcsingleData)
productRoutes.put("/update/:id", upload.single("productImage"), productUpdate)
productRoutes.put("/status-update", productstatusUpdate)
productRoutes.post("/multi-delete", productMultidelete)



module.exports = { productRoutes }