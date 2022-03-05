const express = require("express");
const { fetchAllCategories, createCategory, fetchCategoryById } = require("../controllers/category");

const router = express.Router();

// @GET     | Public     | /api/categories
router.get("/categories", fetchAllCategories);
// @POST    | Public     | /api/categories
router.post("/categories", createCategory);
// @GET     | Public     | /api/categories/id
router.get("/categories/:id", fetchCategoryById);

module.exports = router;
