const Joi = require("joi");

const forgotPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email address",
      "any.required": "Email is required",
    }),
  }),
};

module.exports = forgotPasswordSchema;
