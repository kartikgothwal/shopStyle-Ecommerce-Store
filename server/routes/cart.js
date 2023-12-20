const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
router
  .post("/getitems", cartController.getCart)
  .post("/additem", cartController.addCartItem)
  .delete("/deleteitem", cartController.deleteCartItems)
  .patch("/updateitem", cartController.updateCartItems);
exports.router = router;
