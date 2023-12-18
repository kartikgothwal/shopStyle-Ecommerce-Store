const Cart = require("../model/cart");
const cartModel = Cart.cartModel;
exports.getCart = async (req, res) => {
  console.log(req.body);
};
