const express = require("express");
const { fetchAllCategories } = require("../controllers/category");

const router = express.Router();

// @GET     | Public     | /api/categories
router.get("/categories", fetchAllCategories);

module.exports = router;
