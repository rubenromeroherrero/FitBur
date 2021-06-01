const Joi = require("joi");

exports.insertUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/)
    .required(),
  role: Joi.string().min(4),
  name: Joi.string().min(4).required(),
  age: Joi.number().positive().required(),
  height: Joi.number().positive().required(),
  weight: Joi.number().positive().required(),
});

exports.updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/),
  name: Joi.string().min(4),
  age: Joi.number().positive(),
  height: Joi.number().positive(),
  weight: Joi.number().positive(),
});
