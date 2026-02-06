const Joi = require("joi");

const updateUserSchema = {
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    age: Joi.number().min(18).max(150),
  }).min(1),
};

module.exports = updateUserSchema;
