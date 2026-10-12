const express = require("express")
const { cartController, cartView, cartRemove, cartQty } = require("../../controllers/web/cartController")
const { checkToken } = require("../../middleware/checkToken")

const cartRoutes = express.Router()

cartRoutes.post("/add-to-cart", checkToken, cartController)
cartRoutes.post("/cart-view", checkToken, cartView)
cartRoutes.post("/remove-cart", checkToken, cartRemove)
cartRoutes.post("/update-qty", checkToken, cartQty)


module.exports = { cartRoutes }
