const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const cartModel = new mongoose.model("cart", CartSchema);
exports.cartModel = cartModel;
