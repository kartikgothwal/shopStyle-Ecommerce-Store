const { WishlistModel } = require("../model/wishlist");
const { tryCatch } = require("../utils/trycatch");

exports.addItem = tryCatch(async (req, res) => {
  let { Items } = req.body;
  if (!Array.isArray(Items)) {
    Items = [Items];
  }

  const ItemsVal = await WishlistModel.insertMany(Items);
  const populatedDoc = await WishlistModel.populate(ItemsVal, {
    path: "product",
  });
  const doc = await WishlistModel.populate(populatedDoc, { path: "user" });
  return res.status(201).json({ message: "Added to wishlist", doc: doc });
});
exports.getItem = tryCatch(async (req, res) => {
  const { userData } = req.body;
  const doc = await WishlistModel.find(userData)
    .populate("user")
    .populate("product");
  return res.status(200).json({ message: "fetched wishlist data", doc: doc });
});
exports.deleteItem = tryCatch(async (req, res) => {
  const doc = await WishlistModel.findOneAndDelete(req.body);
  return res.status(200).json({ message: "Removed from wishlist", doc: doc });
});
