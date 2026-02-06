const Joi = require("joi");

const signInSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "invalid email address",
    }),
    password: Joi.string().min(3).max(30).required(),
  }),
};

module.exports = signInSchema;
