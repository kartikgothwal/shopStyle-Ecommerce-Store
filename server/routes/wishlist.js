const express = require("express");
const router = express.Router();
const {
  UserTokenAuthorization,
} = require("../middlewares/validation/usertokenverify");
const WishlistController = require("../controllers/wishlist");
router
  .post("/additem", UserTokenAuthorization, WishlistController.addItem)
  .post("/getitem", UserTokenAuthorization, WishlistController.getItem)
  .delete("/deleteitem", UserTokenAuthorization, WishlistController.deleteItem);
exports.router = router;
