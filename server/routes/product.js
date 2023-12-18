const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");
router
  .get("/productdetail/:id", ProductController.getProductByID)
  .post("/", ProductController.getProducts)
  .post("/addproduct", ProductController.addProducts);
exports.router = router;
