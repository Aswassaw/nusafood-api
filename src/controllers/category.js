const mongoose = require("mongoose");
const createError = require("http-errors");
const Category = require("../models/category");
const { postCategoryValidation } = require("../validations/category");

exports.fetchAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    if (categories.length === 0) {
      return next(createError(404, "No categories found"));
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await postCategoryValidation.validateAsync(req.body);

    const category = new Category();
    category.name = result.name;
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    error.isJoi === true ? (error.status = 422) : "";
    next(error);
  }
};

exports.fetchCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return next(createError(404, "No category found"));
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid category Id"));
    }
    next(error);
  }
};

exports.updateCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await postCategoryValidation.validateAsync(req.body);

    const category = await Category.findById(id);
    if (!category) {
      return next(createError(404, "No category found"));
    }
    category.name = result.name;
    category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid category Id"));
    }
    next(error);
  }
};

exports.deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return next(createError(404, "No category found"));
    }
    category.remove();

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid category Id"));
    }
    next(error);
  }
};
