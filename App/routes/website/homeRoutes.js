const express = require("express")
const { getProductid, getCategory, getBestsellingproduct, getTopRated } = require("../../controllers/web/homeControrller")

const homeRoutes=express.Router()


homeRoutes.get("/product/:catId",getProductid)
homeRoutes.get("/category",getCategory)
homeRoutes.get("/best-selling",getBestsellingproduct)
homeRoutes.get("/top-rated",getTopRated)




module.exports={homeRoutes}