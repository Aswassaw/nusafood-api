const Joi = require("joi");

const postCategoryValidation = Joi.object({
  name: Joi.string().required().min(1).max(25),
});

module.exports = { postCategoryValidation };
