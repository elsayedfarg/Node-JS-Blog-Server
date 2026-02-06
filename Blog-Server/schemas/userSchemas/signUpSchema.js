const Joi = require("joi");

const signUpSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
    age: Joi.number().min(18).max(150).required(),
  }),
};

module.exports = signUpSchema;
