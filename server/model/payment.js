const mongoose = require("mongoose");
const { Schema } = mongoose;
const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    amount: { type: Number, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);
const paymentModel = new mongoose.model("payment", paymentSchema);
exports.paymentModel = paymentModel;
