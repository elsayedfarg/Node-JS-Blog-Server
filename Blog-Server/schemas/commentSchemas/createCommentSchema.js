const Joi = require("joi");

const createCommentSchema = {
  body: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    postId: Joi.string().length(24).hex().required(),
    parentCommentId: Joi.string().length(24).hex().optional(),
  }),
};

module.exports = createCommentSchema;
