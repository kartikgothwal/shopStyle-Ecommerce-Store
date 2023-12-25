const Cart = require("../model/cart");
const cartModel = Cart.cartModel;
exports.getCart = async (req, res) => {
  try {
    const { userID } = req.body;
    const doc = await cartModel.find({ user: userID }).populate("product");
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
    const populatedDoc = await cartModel.populate(doc, { path: "product" });
    return res.status(201).json({
      items: populatedDoc,
      message: "Added to the cart",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Adding to cart failed", error: error.message });
  }
};
exports.deleteCartItems = async (req, res) => {
  try {
    const { userID, ProductID } = req.body;
    const doc = await cartModel.deleteOne({ user: userID, product: ProductID });
    return res.status(200).json({
      message: "Item removed successfully",
      doc: { userID, ProductID },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to remove", error: error.message });
  }
};
exports.updateCartItems = async (req, res) => {
  try {
    const { userID, productID, change } = req.body;
    const filter = { user: userID, product: productID };
    const doc = await cartModel
      .findOneAndUpdate(filter, change, {
        new: true,
      })
      .populate("product");
    return res.status(200).json({
      message: "Item updated successfully",
      doc: doc,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update", error: error.message });
  }
};

exports.removeCart = async (req, res) => {
  try {
    console.log("🚀 ~ file: cart.js:67 ~ exports.removeCart= ~ req:", req.body);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
