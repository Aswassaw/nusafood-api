const mongoose = require("mongoose");
const createError = require("http-errors");
const Dish = require("../models/dish");
const { postDishValidation } = require("../validations/dish");

exports.fetchAllDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find({})
      .select("-photo")
      .populate("category", "_id, name");

    if (dishes.length === 0) {
      return next(createError(404, "No dishes found"));
    }

    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createDish = async (req, res, next) => {
  try {
    const result = await postDishValidation.validateAsync(req.body);
    const { name, description, price, category, photo } = result;

    const dishExist = await Dish.findOne({ name });
    if (dishExist) {
      return next(createError(404, `The dish ${name} already exist`));
    }

    const dish = new Dish({ name, description, price, category, photo });
    savePhoto(dish, photo);
    const newDish = await dish.save();
    newDish.photo = undefined;

    res.status(201).json(newDish);
  } catch (error) {
    console.error(error);
    error.isJoi === true ? (error.status = 422) : "";
    next(error);
  }
};

function savePhoto(dish, photo) {
  const imageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if (photo !== null && imageTypes.includes(photo.type)) {
    dish.photo.data = new Buffer.from(photo.data, "base64");
    dish.photo.contentType = photo.type;
  }
}

exports.fetchDishById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findById(id)
      .select("-photo")
      .populate("category", "_id, name");

    if (!dish) {
      return next(createError(404, "No dish found"));
    }

    res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid dish Id"));
    }
    next(error);
  }
};

exports.fetchDishPhoto = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findById(id).select("photo");

    if (!dish) {
      return next(createError(404, "No dish found"));
    }

    if (dish.photo.data) {
      res.set("Content-Type", dish.photo.contentType);
      res.send(dish.photo.data);
    } else {
      return res.status(204).json({ message: "No dish photo found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid dish Id"));
    }
    next(error);
  }
};
