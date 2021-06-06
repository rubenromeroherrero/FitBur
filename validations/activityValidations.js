const Joi = require("joi");
const { ACTIVITY_VISIBILITY } = require("../util/constants");

exports.insertActivitySchema = Joi.object({
  name: Joi.string().required(),
  serie: Joi.number().positive().required(),
  replay: Joi.number().positive().required(),
  repose: Joi.number().positive().required(),
  visibility: Joi.string().valid(...Object.values(ACTIVITY_VISIBILITY)),
  UserId: Joi.string().required(),
  RoutineId: Joi.string().required(),
});

exports.updateActivitySchema = Joi.object({
  name: Joi.string(),
  serie: Joi.number().positive(),
  replay: Joi.number().positive(),
  repose: Joi.number().positive(),
  visibility: Joi.string().valid(...Object.values(ACTIVITY_VISIBILITY)),
});
