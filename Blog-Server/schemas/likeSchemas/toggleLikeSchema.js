const Joi = require("joi");

const toggleLikeSchema = {
  body: Joi.object({
    targetType: Joi.string().valid("Post", "Comment").required(),
    targetId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = toggleLikeSchema;
