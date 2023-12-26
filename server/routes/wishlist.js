const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlist");
router
  .post("/additem", WishlistController.addItem)
  .post("/getitem", WishlistController.getItem);
exports.router = router;
