const Joi = require("joi");

const getCommentsByPostSchema = {
  params: Joi.object({
    postId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = getCommentsByPostSchema;
