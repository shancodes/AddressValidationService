const Joi = require('joi');

const uk = Joi.object({
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

    postalcode: Joi.string()
    .alphanum()
    .required(),

    country: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required()
});

module.exports = uk;