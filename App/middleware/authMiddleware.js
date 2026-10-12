const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer token
        
        if (!token) {
            return res.status(401).json({
                status: 0,
                message: "Access denied. No token provided."
            });
        }

        const decoded = jwt.verify(token, process.env.TOKENKEY);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                status: 0,
                message: "Invalid token. User not found."
            });
        }

        req.user = {id}; // User info attach kar diya
        next();
        
    } catch (error) {
        return res.status(401).json({
            status: 0,
            message: "Invalid token",
            error: error.message
        });
    }
};

module.exports = {verifyToken };