const express = require("express");
const router = express.Router();
const {
  UserTokenAuthorization,
} = require("../middlewares/validation/usertokenverify");
const addressController = require("../controllers/address");
router
  .post("/getaddress", UserTokenAuthorization, addressController.getaddress)
  .post("/addaddress", UserTokenAuthorization, addressController.addaddress)
  .delete(
    "/deleteaddress/:addressID",
    UserTokenAuthorization,
    addressController.deleteaddress
  );
exports.router = router;
