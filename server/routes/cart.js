const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const {
  UserTokenAuthorization,
} = require("../middlewares/validation/usertokenverify");
router
  .post("/getitems", UserTokenAuthorization, cartController.getCart)
  .post("/additem", UserTokenAuthorization, cartController.addCartItem)
  .delete("/deleteitem", UserTokenAuthorization, cartController.deleteCartItems)
  .delete("/deletecart", UserTokenAuthorization, cartController.removeCart)
  .patch("/updateitem", UserTokenAuthorization, cartController.updateCartItems);
exports.router = router;
