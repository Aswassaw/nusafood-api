const mongoose = require("mongoose");
const createError = require("http-errors");
const Dish = require("../models/dish");

exports.createDish = async (req, res, next) => {
  const { name, description, price, category, photo } = req.body;

  try {
    let dish = new Dish({ name, description, price, category, photo });
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
