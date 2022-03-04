const createError = require("http-errors");
const Category = require("../models/category");

exports.fetchAllCategories = async (req, res, next) => {
  try {
    const result = await Category.findd({});

    if (result.length === 0) {
      return next(createError(404, "No categories found"));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
