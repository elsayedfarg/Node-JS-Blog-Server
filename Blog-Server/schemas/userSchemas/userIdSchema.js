const Joi = require("joi");

const userIdSchema = {
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = userIdSchema;
