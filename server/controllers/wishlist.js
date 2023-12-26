const { WishlistModel } = require("../model/wishlist");

exports.addItem = async (req, res) => {
  try {
    const { Items } = req.body;
    const doc = await WishlistModel.create(Items);
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

    const doc = await WishlistModel.find(userData);
    return res.status(200).json({ message: "fetched wishlist data", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to Add to wishlist", error: error.message });
  }
};
