const mongoose = require("mongoose");
const { Schema } = mongoose;
const WishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true }
);
const WishlistModel = new mongoose.model("wishlist", WishlistSchema);
exports.WishlistModel = WishlistModel;
