const Joi = require("joi");

const getLikesCountSchema = {
  query: Joi.object({
    targetType: Joi.string().valid("Post", "Comment").required(),
    targetId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = getLikesCountSchema;
