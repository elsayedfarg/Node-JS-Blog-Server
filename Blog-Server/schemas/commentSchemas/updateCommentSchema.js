const Joi = require("joi");

const updateCommentSchema = {
  params: Joi.object({
    commentId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
  }),
};

module.exports = updateCommentSchema;
