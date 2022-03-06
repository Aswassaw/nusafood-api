const express = require("express");
const {
  fetchAllDishes,
  createDish,
  fetchDishById,
} = require("../controllers/dish");

const router = express.Router();

// @GET     | Public     | /api/dishes
router.get("/dishes", fetchAllDishes);
// @POST     | Public     | /api/dishes
router.post("/dishes", createDish);
// @GET     | Public     | /api/dishes/:id
router.get("/dishes/:id", fetchDishById);

module.exports = router;
