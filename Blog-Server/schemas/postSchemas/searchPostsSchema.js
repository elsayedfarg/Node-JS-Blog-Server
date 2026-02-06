const Joi = require("joi");

const searchPostsSchema = {
  query: Joi.object({
    q: Joi.string().min(1).required().messages({
      "any.required": "Search query is required",
      "string.min": "Search query cannot be empty",
    }),
    tags: Joi.string().optional(),
    from: Joi.date().iso().optional(),
    to: Joi.date().iso().min(Joi.ref("from")).optional().messages({
      "date.min": "End date must be after start date",
    }),
  }),
};

module.exports = searchPostsSchema;
