const mongoose = require("mongoose");
const createError = require("http-errors");
const Dish = require("../models/dish");

exports.createDish = async (req, res, next) => {
  const { name, description, price, category } = req.body;

  try {
    let dish = new Dish();
    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.category = category;
    await dish.save();

    res.status(201).json(dish);
  } catch (error) {
    console.error(error);
    error.isJoi === true ? (error.status = 422) : "";
    next(error);
  }
};
