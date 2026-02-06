const Joi = require("joi");

const getAllCommentsSchema = {
  query: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    postId: Joi.string().length(24).hex().optional(),
  }),
};

module.exports = getAllCommentsSchema;
