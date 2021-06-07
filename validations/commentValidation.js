const Joi = require("joi");
const { COMMENT_VISIBILITY } = require("../util/constants");

exports.insertCommentSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string().required(),
  score: Joi.number().positive().min(0).max(5).required(),
  visibility: Joi.valid(...Object.values(COMMENT_VISIBILITY)),
  UserId: Joi.string().required(),
  RoutineId: Joi.string().required(),
});

exports.updateCommentSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  score: Joi.number().positive().min(0).max(5),
  visibility: Joi.valid(...Object.values(COMMENT_VISIBILITY)),
});
