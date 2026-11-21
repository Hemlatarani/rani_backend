// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

// यह कोड आपकी .env फ़ाइल से चाबियों को कनेक्ट कर देगा
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
