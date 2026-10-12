const express = require("express")
const { sendOtp, userCreate, userlogin, googleLogin, changePassword } = require("../../controllers/web/userAuthController")
const { verifyToken } = require("../../middleware/authMiddleware")

const userAuthRoutes = express.Router()

userAuthRoutes.post("/send-otp", sendOtp)
userAuthRoutes.post("/create", userCreate)
userAuthRoutes.post("/login", userlogin)
userAuthRoutes.post("/google-login", googleLogin)
userAuthRoutes.post("/change-password", verifyToken, changePassword)

module.exports = { userAuthRoutes }