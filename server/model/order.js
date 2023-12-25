const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        _id: false,
        productData: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    totalamount: {
      type: Number,
      required: true,
    },
    orderstatus: { type: String, required: true },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "payment",
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
    },
  },
  { timestamps: true }
);

const OrderModel = new mongoose.model("order", OrderSchema);
exports.OrderModel = OrderModel;
