import Joi from "joi";

export default {
  getTasks(req) {
    const schema = Joi.object({
      page: Joi.number().integer().min(1).max(99999).default(1),
    });

    const { error, value } = schema.validate(req.query);

    let fields = {};
    if (error) {
      fields.page = error.details[0].message;
    }

    return {
      fields: fields,
      haveErrors: error !== null,
    };
  },
  createTask(req) {
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^([a-zA-Z0-9])+$/)
        .messages({
          "string.empty": "Title field is required",
          "string.pattern.base":
            "Invalid title value allow only text, number and space (max space count between word are one space)",
        }),
      description: Joi.string()
        .min(3)
        .max(5000)
        .required()
        .pattern(/^([a-zA-Z0-9]( )?)+$/)
        .messages({
          "string.empty": "Description field is required",
          "string.pattern.base":
            "Invalid description value allow only text, number and space (max space count between word are one space)",
        }),
      taskDate: Joi.string()
        .pattern(/^20\d{2}-\d{2}-\d{2}$/)
        .required()
        .custom((value, helpers) => {
          if (new Date() > new Date(value)) {
            return helpers.message("Please provide a date in the future");
          }
          return value;
        }),
    });

    const { error, value } = schema.validate(req.body);

    let fields = {};
    if (error) {
      error.details.forEach((detail) => {
        fields[detail.context.key] = detail.message;
      });
    }

    return {
      fields: fields,
      haveErrors: error !== null,
    };
  },
};
