//TODO : Add more validations,Date format,date should be after current date,...
const Joi = require("@hapi/joi");
module.exports = function(req, res, next) {
  const schema = Joi.object().keys({
    checkin: Joi.date().required(),
    checkout: Joi.date().required(),
    code: Joi.string()
      .length(3)
      .required()
  });

  const { error, value } = Joi.validate(req.query, schema);

  if (error) {
    res.status(400).send("Bad Request." + error.details[0].message);
  } else {
    next();
  }
};
