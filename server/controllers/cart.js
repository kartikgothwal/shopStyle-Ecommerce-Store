const Cart = require("../model/cart");
const cartModel = Cart.cartModel;
exports.getCart = async (req, res) => {
  console.log(req.body);
};
exports.addCartItem = async (req, res) => {
  try {
    let { item } = req.body;
    if (!Array.isArray(item)) {
      item = [item];
    }
    const doc = await cartModel.insertMany(item);
    console.log("doc", doc);
    return res.status(201).json({
      items: doc,
      message: "Added to the cart",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Adding to cart failed", error: error.message });
  }
};
