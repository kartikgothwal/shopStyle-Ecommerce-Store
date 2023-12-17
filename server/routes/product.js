const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/product");
router
  .post("/", AuthController.getProducts)
  .post("/addproduct", AuthController.addProducts)
exports.router = router;
