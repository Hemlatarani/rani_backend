
const bcrypt = require('bcrypt');
const { userModel } = require("../../models/userModel");
const { transporter } = require('../../config/MailConfig');
const saltRounds = 10;
const User = require("../../models/userModel");
let jwt = require('jsonwebtoken');





let userOTP = new Map()
let sendOtp = async (req, res) => {
    try {
        let { userEmail } = req.body;
        let OTP = Number((Math.random() * 9999999).toString().split(".")[0].slice(0, 4))


        // backend me otp store function 
        userOTP.set("myOTP", OTP);

        //
        const info = await transporter.sendMail({
            from: '"MONSTA OTP" <ranirani81996@gmail.com>',
            to: userEmail,
            subject: "OTP| MONSTA",
            text: "OTP", // Plain-text version of the message
            html: `<b>OTP ${OTP}</b>`, // HTML version of the message
        });



        let obj = {
            status: 1,
            msg: "OTP sent successfully"
        }
        res.send(obj)
    }
    catch (err) {

        console.log("error is ", err)
        let obj = {
            status: 0,
            msg: "OTP not sent",
            err: err.message
        }
        res.send(obj)
    }

}
let userCreate = async (req, res) => {

    let { userName, userEmail, userPhone, userPassword, otp } = req.body

    let myOTP = userOTP.get("myOTP")
    let resObj
    if (otp == myOTP) {
        const hash = bcrypt.hashSync(userPassword, saltRounds);

        let userObj = {
            userName,
            userEmail,
            userPhone,
            userPassword: hash,
        }
        let user = await userModel(userObj)
        let userRes = await user.save()

        resObj = {
            status: 1,
            msg: "Correct Otp ",
            userRes
        }

    }
    else {
        resObj = {
            status: 0,
            msg: "please fill correct otp"
        }
    }
    res.send(resObj)
}
         
 
let userlogin = async (req, res) => {
    try {
        let { userEmail, userPassword } = req.body;

        // console.log("Login API Hit:", userEmail, userPassword);

        let checkEmail = await userModel.findOne({ userEmail });

        // console.log("DB User:", checkEmail);

        if (checkEmail) {
            //db password
            let dbuserPassword = checkEmail.userPassword;
            // checkpassword
            let checkPassword = bcrypt.compareSync(userPassword, dbuserPassword);// true

            // console.log('checkpass=>', checkPassword)

            //create token

            if (checkPassword) {

                let token = jwt.sign({ id: checkEmail._id }, process.env.TOKENKEY);
                console.log(token);
                
                return res.status(200).json({
                    status: 1,
                    user: checkEmail,
                    token
                });
            } else {
                return res.status(200).json({
                    status: 0,
                    msg: "Invalid password",
                });
            }
        } else {
            return res.status(200).json({
                status: 0,
                msg: "Invalid Email id",
            });
        }
    } 
    
    catch (error) {
        console.log("Login Error:", error);
        return res.status(500).json({
            status: 0,
            msg: "Server Error",
            error: error.message,
        });
    }
};



let googleLogin = async (req, res) => {
    console.log("google login hit", req.body)
    try {
        let { userName, userEmail } = req.body;
        // console.log("useremail",userEmail,userName)

        if (!userEmail) {
            return res.status(400).json({
                status: false,
                message: "Email required"
            });
        }

        let checkUser = await userModel.findOne({ userEmail });
        // User already exists
        if (checkUser) {
            return res.status(200).json({
                status: true,
                user_id: checkUser._id,
                user: checkUser,
                message: "Login successful"
            });
        }

        // Create new user
        let newUser = await userModel.create({
            userName,
            userEmail,
            loginType: "google"
        });

        return res.status(201).json({
            status: true,
            user_id: newUser._id,
            user: newUser,
            message: "User created & login successful"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
let changePassword = async (req, res) => {
    try {
        let { cur_password, new_password, cnf_password } = req.body;

        let userId = req.user._id; // middleware se milega

        if (!cur_password || !new_password || !cnf_password) {
            return res.status(400).json({
                status: 0,
                msg: "All fields required"
            });
        }

        if (new_password !== cnf_password) {
            return res.status(400).json({
                status: 0,
                msg: "New password and confirm password do not match"
            });
        }

        let user = await userModel.findById(userId);
        let checkOldPassword = bcrypt.compareSync(cur_password, user.userPassword);

        if (!checkOldPassword) {
            return res.status(400).json({
                status: 0,
                msg: "Old password is incorrect"
            });
        }

        const hash = bcrypt.hashSync(new_password, saltRounds);
        await userModel.updateOne({ _id: userId }, { userPassword: hash });

        res.status(200).json({
            status: 1,
            msg: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            msg: "Server error",
            error: error.message
        });
    }
}

module.exports = { sendOtp, userCreate, userlogin, googleLogin, changePassword }