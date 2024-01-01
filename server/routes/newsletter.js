const express = require("express");
const router = express.Router();
const NewsLetterController = require("../controllers/newsletter");
const {
  ValidateNewsLetter,
  newsLetterValidaton,
} = require("../middlewares/validation/newsletter");
router.post(
  "/add",
  ValidateNewsLetter,
  newsLetterValidaton,
  NewsLetterController.addNewLetter
);
exports.router = router;
