const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search");
router.get("/", SearchController.SearchProduct);
exports.router = router;
