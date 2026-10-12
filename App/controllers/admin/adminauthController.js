const { adminModel } = require("../../models/adminModel")

let adminLogin = async (req, res) => {

    let { adminEmail, adminPassword } = req.body

    let admin = await adminModel.findOne({ adminEmail, adminPassword })


    if (admin) {
        let resObj = {
            status: 1,
            message: "Admin logged in successfully",
            admin
        }
        res.send(resObj)
    }
    else {
        let resObj = {
            status: 0,
            message: "incorrect email or password",
        }
        res.send(resObj)
    }
}




 let verifyadminid = async (req, res) => {
  try {
    let { adminId } = req.body

    // ❌ adminId nahi aayi
    if (!adminId) {
      return res.send({
        status: 0,
        redirect: true,
        message: "Admin ID missing"
      })
    }

    // DB me admin check
    let admin = await adminModel.findById(adminId)

    // ❌ adminId genuine nahi
    if (!admin) {
      return res.send({
        status: 0,
        redirect: true,
        message: "Invalid admin, please login again"
      })
    }

    // ✅ adminId genuine
    return res.send({
      status: 1,
      redirect: false,
      message: "Admin verified",
      admin
    })

  } catch (error) {
    return res.send({
      status: 0,
      redirect: true,
      message: "Server error"
    })
  }
}

let adminchangePassword = async (req, res) => {
    try {
        let { id } = req.params;
        let { oldPassword, newPassword, confirmPassword } = req.body;

        // Check old password
        let checkpassword = await adminModel.findOne({ _id: id, adminPassword: oldPassword });
        
        if (checkpassword) {
            if (newPassword === confirmPassword) {
                // Update password
                await adminModel.updateOne({ _id: id }, {
                    $set: { adminPassword: newPassword }
                });
                
                let resObj = {
                    status: 1,
                    message: "Password changed successfully"
                };
                res.send(resObj);
            } else {
                let resObj = {
                    status: 0,
                    message: "New password and confirm password do not match"
                };
                res.send(resObj);
            }
        } else {
            let resObj = {
                status: 0,
                message: "Old password is incorrect"
            };
            res.send(resObj);
        }
    } catch (error) {
        res.send({
            status: 0,
            message: "Server error",
            error: error.message
        });
    }
}
module.exports = { adminLogin, adminchangePassword,verifyadminid }