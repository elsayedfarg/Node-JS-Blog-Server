const Joi = require("joi");

const getAllPostsSchema = {
  query: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
  }),
};

module.exports = getAllPostsSchema;
