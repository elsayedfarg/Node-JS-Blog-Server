const Joi = require("joi");

const updatePostSchema = {
  params: Joi.object({
    postId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object({
    title: Joi.string().min(3).max(150),
    content: Joi.string().min(10),
    author: Joi.string().length(10),
    tags: Joi.array().items(Joi.string().min(1)),
    published: Joi.boolean(),
  }).min(1),
};

module.exports = updatePostSchema;
