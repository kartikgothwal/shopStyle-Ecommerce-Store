const Cart = require("../model/cart");
const cartModel = Cart.cartModel;
const { tryCatch } = require("../utils/trycatch");

exports.getCart = tryCatch(async (req, res) => {
  const { userID } = req.body;
  const doc = await cartModel.find({ user: userID }).populate("product");
  return res.status(200).json({ message: "items found successfully", doc });
});
exports.addCartItem = tryCatch(async (req, res) => {
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
});
exports.deleteCartItems = tryCatch(async (req, res) => {
  const { userID, ProductID } = req.body;
  const doc = await cartModel.deleteOne({ user: userID, product: ProductID });
  return res.status(200).json({
    message: "Item removed successfully",
    doc: { userID, ProductID },
  });
});
exports.updateCartItems = tryCatch(async (req, res) => {
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
});

exports.removeCart = tryCatch(async (req, res) => {
  try {
    const { userID } = req.body;
    const doc = await cartModel.deleteMany({ user: userID });
    return res.status(200).json({
      message: "Refreshed the cart",
      doc: doc,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});
