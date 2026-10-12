const { productModel } = require("../../models/productModel")

let productDetails = async (req, res) => {
    let { slug } = req.params
    console.log("slug id define", slug)
    let cartProductdata = await productModel.findOne({ slug: slug })
    let obj = {
        status: 1,
        cartProductdata,
        staticPath: process.env.PRODUCTIMAGEPATH   // ✅ ADD THIS


    }
    res.send(obj)

}
let topratedData = async (req, res) => {
    try {
    
        let topData = await productModel.find({ topRated: true }).limit(2)
        let obj = {
            status: 1,
            msg: "top rated data fetch successfully",
            topData,
            staticPath: process.env.PRODUCTIMAGEPATH
        }
        res.send(obj)

    }
    catch (error) {
        console.log(errr)
        let obj = {
            status: 0,
            msg: "top rated data fetch  failed",
            error
        }
        res.send(obj)
    }
}
module.exports = { productDetails,topratedData }