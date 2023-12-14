const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,

    validate: {
      validator: (value) => {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        );
      },
      message: "please enter a valid password",
    },
  },
  orderDetails: [
    {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "carts",
    },
  ],
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "wishlists",
    },
  ],
  AccessToken: String,
});
const UserModel = new mongoose.model("user", UserSchema);
exports.UserModel = UserModel;
