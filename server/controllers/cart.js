const Cart = require("../model/cart");
const cartModel = Cart.cartModel;
exports.getCart = async (req, res) => {
  try {
    const { userID } = req.body;
    const doc = await cartModel.find({ user: userID }).populate("product");
    console.log("data", doc);
    return res.status(200).json({ message: "items found successfully", doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to fetch cart items", error: error.message });
  }
};
exports.addCartItem = async (req, res) => {
  try {
    let { item } = req.body;
    if (!Array.isArray(item)) {
      item = [item];
    }
    const doc = await cartModel.insertMany(item);

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
exports.deleteCartItems = (req, res) => {
  try {
    console.log("delete", req.body);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to remove", error: error.message });
  }
};
