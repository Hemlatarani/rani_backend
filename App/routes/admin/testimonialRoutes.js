let express = require("express")

const multer = require('multer')
const { testiModel } = require("../../models/testiModel")
const { testiView, testimonalCreate, testidelete, testiUpdate, testiMultidelete, singleData, tsingleData, tstatusUpdate } = require("../../controllers/admin/testiController")
let testimonialRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/testimonials")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


testimonialRoutes.post("/create", upload.single('testiImage'), testimonalCreate)
testimonialRoutes.get("/view", testiView)
testimonialRoutes.delete("/delete/:id",testidelete)
testimonialRoutes.get("/edit-testimonial/:id",tsingleData)
testimonialRoutes.put("/update/:id",testiUpdate)
testimonialRoutes.put("/status-update",tstatusUpdate)
testimonialRoutes.post("/multi-delete",testiMultidelete)



module.exports = { testimonialRoutes }