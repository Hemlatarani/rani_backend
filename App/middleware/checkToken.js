// 
let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 0,
        msg: "Access Denied! Token required"
      });
    }

    let decode = jwt.verify(token, process.env.TOKENKEY);
    req.user=decode

//     let { id } = decode;
// req.user.id = id

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    console.log("token issu solve",checkToken)
    
    return res.status(401).json({
      status: 0,
      msg: "Invalid or Expired Token"
    });
  }
};

module.exports = { checkToken };