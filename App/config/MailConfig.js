require("dotenv").config();

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "ranirani81996@gmail.com",
    pass: process.env.APPPASSWORD,
    // monstaweb password //  yjfs gvye njub bjwy
  },
});
module.exports = { transporter }
