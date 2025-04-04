const joi = require('joi');

const userSchema = joi.object().keys({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().pattern(new RegExp('^.{3,30}$')).required()
});

module.exports = userSchema;