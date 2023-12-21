const express = require("express");
const router = express.Router();
const {
  UserTokenAuthorization,
} = require("../middlewares/validation/usertokenverify");

const addressController = require("../controllers/address");

router.post("/addadress", UserTokenAuthorization, addressController.addadress);
exports.router = router;
