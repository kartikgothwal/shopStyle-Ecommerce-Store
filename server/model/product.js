const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 1 },
    brand: { type: String, required: true, minlength: 1 },
    description: {
      type: String,
      minlength: [0, "Minimum length not met"],
      maxlength: [750, "Maximum length exceeded"],
    },
    price: { type: Number, min: [0, "Invaild Price"], required: true },
    discountPercentage: {
      type: Number,
      min: [0, "Wrong min discountPercentage"],
      max: [20, "Wrong max discountPercentage"],
      default: 0,
    },
    availability: { type: Boolean, required: true },
    stock: { type: Number, required: true, min: [0, "Minimum length not met"] },
    thumbnail: { type: String, required: true },
    images: [{ type: String, required: true }],
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "rating",
      },
    ],
    category: { type: String, required: true },
    subCategory: [String],
    sizes: [{ type: String, minlength: 1, required: false }],
    faq: [
      {
        type: Schema.Types.ObjectId,
        ref: "faq",
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = new mongoose.model("product", productSchema);
exports.ProductModel = ProductModel;
