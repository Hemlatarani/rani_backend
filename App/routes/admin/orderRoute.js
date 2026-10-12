let express=require("express")
const { getviewOrder, getOrderDetail } = require("../../controllers/admin/orderController")

let orderRoutes=express.Router()

orderRoutes.get("/get-order",getviewOrder) // mene :id hataya admin ko filter nahi chahiye
orderRoutes.get("/get-order-detail/:id",getOrderDetail) // mene naya route banaya detail ke liye params se id lega
module.exports={orderRoutes}
