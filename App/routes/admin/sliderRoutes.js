let express = require("express")
const multer = require('multer')

const { sliderCreate, sliderView, sliderDelete, sliderUpdate, sliderMultidelete, slsingleData, sstatusUpdate } = require("../../controllers/admin/sliderController")

let sliderRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "uploads/slider")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


sliderRoutes.post("/create", upload.single('sliderImage'), sliderCreate)
sliderRoutes.get("/view",sliderView)
sliderRoutes.delete("/delete/:id",sliderDelete)
sliderRoutes.get("/edit-slider/:id",slsingleData)
sliderRoutes.put("/update/:id",sliderUpdate)
sliderRoutes.put("/status-update",sstatusUpdate)
sliderRoutes.post("/multi-delete",sliderMultidelete)

module.exports = { sliderRoutes }