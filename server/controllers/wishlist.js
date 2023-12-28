const { WishlistModel } = require("../model/wishlist");

exports.addItem = async (req, res) => {
  try {
    const { Items } = req.body;
    if (!Array.isArray(Items)) {
      Items = [Items];
    }
    const ItemsVal = await WishlistModel.insertMany(Items);
    const populatedDoc = await WishlistModel.populate(ItemsVal, {
      path: "product",
    });
    const doc = await WishlistModel.populate(populatedDoc, { path: "user" });
    return res.status(201).json({ message: "Added to wishlist", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to Add to wishlist", error: error.message });
  }
};
exports.getItem = async (req, res) => {
  try {
    const { userData } = req.body;
    const doc = await WishlistModel.find(userData)
      .populate("user")
      .populate("product");
    return res.status(200).json({ message: "fetched wishlist data", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch wishlist", error: error.message });
  }
};
exports.deleteItem = async (req, res) => {
  try {
    console.log(req.body);
    const doc = await WishlistModel.findOneAndDelete(req.body);
    return res.status(200).json({ message: "Removed from wishlist", doc: doc });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove from wishlist",
      error: error.message,
    });
  }
};
