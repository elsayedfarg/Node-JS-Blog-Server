const Joi = require("joi");

const notificationIdSchema = {
  params: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
};

module.exports = notificationIdSchema;
