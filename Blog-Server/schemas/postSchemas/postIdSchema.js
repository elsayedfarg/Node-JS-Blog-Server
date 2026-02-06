const Joi = require("joi");

const postIdSchema = {
  params: Joi.object({
    postId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = postIdSchema;
