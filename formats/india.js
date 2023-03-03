const Joi = require('joi');

const india = Joi.object({
    fullName: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    addressLine1: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    addressLine2: Joi.string()
    .alphanum(),

    addressLine3: Joi.string()
    .alphanum(),

    city: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    state: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    pincode: Joi.string().pattern(new RegExp('^[0-9]$'))
    .required(),

    country: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required()
});

module.exports = india;