const express = require("express");
const { createDish } = require("../controllers/dish");

const router = express.Router();

// @POST     | Public     | /api/dishes
router.post("/dishes", createDish);

module.exports = router;
