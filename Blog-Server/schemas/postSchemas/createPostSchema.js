const Joi = require("joi");

const createPostSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(150).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().length(10).required(),
    tags: Joi.array().items(Joi.string().min(1)).default([]),
  }),
};

module.exports = createPostSchema;
