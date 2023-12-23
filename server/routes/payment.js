const express = require("express");
const router = express.Router();
const {
  UserTokenAuthorization,
} = require("../middlewares/validation/usertokenverify");
const PaymentController = require("../controllers/payment");
router.post("/checkout", UserTokenAuthorization, PaymentController.checkOut);
exports.router = router;
