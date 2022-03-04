const Category = require("../models/category");

exports.fetchAllCategories = async (req, res) => {
  try {
    const result = await Category.find({});

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
