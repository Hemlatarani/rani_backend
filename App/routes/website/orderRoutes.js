 let express=require("express")
const { saveOrder, verifyOrder, viewOrder, getOrderDetail } = require("../../controllers/web/orderController")
const { verifyToken } = require("../../middleware/authMiddleware")
const { checkToken } = require("../../middleware/checkToken")
 let orderRoutes=express.Router()


 orderRoutes.post("/order-save",checkToken,saveOrder)
 orderRoutes.post("/verify-order",checkToken,verifyOrder)
 orderRoutes.get("/view-order",checkToken,viewOrder)
 orderRoutes.get("/get-orderDetails",checkToken,getOrderDetail)
 
 module.exports={orderRoutes}