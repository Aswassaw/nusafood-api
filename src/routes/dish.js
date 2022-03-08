const express = require("express");
const {
  fetchAllDishes,
  createDish,
  fetchDishById,
  fetchDishPhoto,
  updateDishById,
  deleteDishById,
} = require("../controllers/dish");

const router = express.Router();

// @GET     | Public     | /api/dishes
router.get("/dishes", fetchAllDishes);
// @POST     | Public     | /api/dishes
router.post("/dishes", createDish);
// @GET     | Public     | /api/dishes/:id
router.get("/dishes/:id", fetchDishById);
// @GET     | Public     | /api/dishes/:id
router.get("/dishes/:id/photo", fetchDishPhoto);
// @PUT     | Public     | /api/dishes/:id
router.get("/dishes/:id/photo", updateDishById);
// @DELETE     | Public     | /api/dishes/:id
router.get("/dishes/:id/photo", deleteDishById);

module.exports = router;
