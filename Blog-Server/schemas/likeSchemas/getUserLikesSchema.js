const Joi = require("joi");

const getUserLikesSchema = {
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
  query: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
  }),
};

module.exports = getUserLikesSchema;
