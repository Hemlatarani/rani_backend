const { default: mongoose } = require("mongoose")
const { categoryModel } = require("../../models/categoryModel")
const { productModel } = require("../../models/productModel")

let getProductid= async(req,res)=>{

    let {catId}=req.params
    // console.log("Received Category ID:", catId)
    
    let productid=await productModel.find({parentCategory:catId,productStatus:true}).populate('parentCategory')
    // console.log("Found Products:", productid.length)
    // let productid =await productModel.find({parentCategory:new mongoose.Types.ObjectId(catId),productStatus:true})
    console.log(productid)

  let resObj={
        status:1,
        productid,
        staticPath: process.env.PRODUCTIMAGEPATH,

    }
    // console.log(resObj)
    res.send(resObj)
}
let getCategory= async(req,res)=>{


    let categoryData=await categoryModel.find({categoryStatus:true})

    let resObj={
        status:1,
        categoryData,
        staticPath: process.env.CATEGORYIMAGEPATH
    }
    res.send(resObj)
}

   let getBestsellingproduct= async(req,res)=>{
    
    let Sellingproduct=await productModel.find({productStatus:true,isSelling:true})
    
    let resObj={
        status:1,
        Sellingproduct,
        staticPath: process.env.PRODUCTIMAGEPATH   // ✅ ADD THIS

    }
    res.send(resObj)

}


let getTopRated = async (req, res) => {
    let products = await productModel.find({ productStatus: true, topRated: true }).populate('subCategoryData')
    res.send({ status: 1, products, staticPath: process.env.PRODUCTIMAGEPATH })
}

module.exports={getProductid,getCategory,getBestsellingproduct,getTopRated}
