const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
router
  .get("/", cartController.getCart)
  .post("/additem", cartController.addCartItem);
exports.router = router;
