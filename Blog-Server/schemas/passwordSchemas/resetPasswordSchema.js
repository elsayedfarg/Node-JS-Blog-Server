const Joi = require("joi");

const resetPasswordSchema = {
  body: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Reset token is required",
    }),
    newPassword: Joi.string().min(8).max(30).required().messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 30 characters",
      "any.required": "New password is required",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "Passwords must match",
        "any.required": "Confirm password is required",
      }),
  }),
};

module.exports = resetPasswordSchema;
