const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
router
  .post("/getitems", cartController.getCart)
  .post("/additem", cartController.addCartItem)
  .delete("/deleteitem", cartController.deleteCartItems)
  .delete("/updateitem", cartController.deleteCartItems);
exports.router = router;
