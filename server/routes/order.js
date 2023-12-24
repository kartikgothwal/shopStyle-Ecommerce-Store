const express = require("express");
const router = express.Router();

const {
  UserTokenAuthorization,
} = require("../middlewares/validation/usertokenverify");
const orderController = require("../controllers/order");

router
  .post("/getorders", UserTokenAuthorization, orderController.getOrders)
  .post("/addorder", UserTokenAuthorization, orderController.addOrders);
exports.router = router;
