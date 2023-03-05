const Joi = require('joi');

const canada = Joi.object({
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

    city: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    province: Joi.string()
    .alphanum()
    .min(1)
    .max(100)
    .required(),

    pincode: Joi.string()
    .alphanum()
    .required(),

    country: Joi.string()
    .alphanum()
    .min(2)
    .max(100)
    .required()
});

module.exports = canada;