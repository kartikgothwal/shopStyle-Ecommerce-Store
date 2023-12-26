const { WishlistModel } = require("../model/wishlist");

exports.addItem = async (req, res) => {
  try {
    console.log("🚀 ~ file: wishlist.js:4 ~ exports.addItem= ~ req:", req);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to Add to wishlist", error: error.message });
  }
};
