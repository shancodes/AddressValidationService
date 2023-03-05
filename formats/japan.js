const Joi = require('joi');

const japan = Joi.object({
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

    postcode: Joi.string()
    .alphanum()
    .length(6)
    .required(),

    country: Joi.string()
    .alphanum()
    .min(2)
    .max(100)
    .required()
});

module.exports = japan;