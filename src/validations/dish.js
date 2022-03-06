const Joi = require("joi");

const postDishValidation = Joi.object({
  name: Joi.string().required().min(1).max(25),
  description: Joi.string().required().min(1).max(255),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

module.exports = { postDishValidation };
