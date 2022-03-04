const express = require("express");
const { fetchAllCategories, createCategory } = require("../controllers/category");

const router = express.Router();

// @GET     | Public     | /api/categories
router.get("/categories", fetchAllCategories);
// @POST     | Public     | /api/categories
router.post("/categories", createCategory);

module.exports = router;
