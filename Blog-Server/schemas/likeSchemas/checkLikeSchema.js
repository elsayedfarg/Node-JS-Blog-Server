const Joi = require("joi");

const checkLikeSchema = {
  query: Joi.object({
    targetType: Joi.string().valid("Post", "Comment").required(),
    targetId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = checkLikeSchema;
