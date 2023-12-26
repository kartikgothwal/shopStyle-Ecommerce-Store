const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlist");
router
  .get("/productdetail/:id", WishlistController.getProductByID)
  .post("/", WishlistController.getProducts)
  .post("/additem", WishlistController.addProducts);
exports.router = router;
