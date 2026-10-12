const cartModel = require("../../models/cartModel")
const { categoryModel } = require("../../models/categoryModel")

let cartController = async (req, res) => {
    let { pid, category, title, img, qty, price } = req.body;
    let id = req.user?.id; // Get from middleware
    
    if (!id) {
        return res.status(400).send({
            status: 0,
            msg: "User authentication required"
        });
    }
    
    let cartObj = {
        productNameId: pid,
        productPrice: price,
        productQty: qty,
        productTitle: title,
        productImage: img,
        category,
        userId: id
    };

    let cartCollection = await cartModel(cartObj);
    let cartRes = await cartCollection.save();
    
    res.send({
        status: 1,
        msg: "Product added to cart successfully",
        cartRes
    });
}

let cartView = async (req, res) => {
    // Get user ID from middleware (req.user) instead of req.body
    let id = req.user?.id || req.body.id;
    
    if (!id) {
        return res.status(400).send({
            status: 0,
            msg: "User ID not found"
        });
    }
    
    let cartData = await cartModel.find({ userId: id }).populate("category", "categoryName");
    
    console.log(`Cart data for user ${id}:`, cartData.length, "items"); // DEBUG
    
    res.send({
        status: 1,
        data: cartData,
        count: cartData.length
    });
}

let cartRemove = async (req, res) => {
    let { cartId } = req.body;
    let id = req.user?.id; // Get from middleware
    
    if (!id) {
        return res.status(400).send({
            status: 0,
            msg: "User authentication required"
        });
    }
    
    let deleted = await cartModel.deleteOne({ _id: cartId, userId: id });
    
    if (deleted.deletedCount === 0) {
        return res.send({ 
            status: 0, 
            msg: "Item not found or already removed" 
        });
    }
    
    res.send({ 
        status: 1, 
        msg: "Item removed from cart" 
    });
}
let cartQty= async(req,res)=>{
    let{cartId,qty}=req.body
    let updateQty=await cartModel.updateOne({_id:cartId},{$set:{productQty:qty}})
    res.send({
        status:1,
        msg:"quantity updated",
        updateQty
    })
}

module.exports = { cartController, cartView, cartRemove,cartQty }
