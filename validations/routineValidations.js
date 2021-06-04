const Joi = require("joi");
const { ROUTINE_VISIBILITY } = require("../util/constants");

exports.insertRoutineSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(), // not required --> optional
  duration: Joi.number().positive().required(),
  date: Joi.date().required(),
  distance: Joi.number().positive(), // not required, optional
  visibility: Joi.string().valid(...Object.values(ROUTINE_VISIBILITY)),
  //.required(),
  // !!! Requerimos indicarle el UserId
  UserId: Joi.string().required(),
});

exports.updateRoutineSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  duration: Joi.number().positive(),
  date: Joi.number(),
  distance: Joi.number(),
  visibility: Joi.string().valid(...Object.values(ROUTINE_VISIBILITY)),
});
