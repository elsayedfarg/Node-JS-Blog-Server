const Joi = require("joi");

const commentIdSchema = {
  params: Joi.object({
    commentId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = commentIdSchema;
