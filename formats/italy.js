const Joi = require('joi');

const italy = Joi.object({
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

    postcode: Joi.string()
    .length(5)
    .alphanum()
    .required(),

    addressLine2: Joi.string()
    .alphanum(),

    city: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    provincecode: Joi.string()
    .alphanum()
    .min(1)
    .max(100)
    .required(),

    country: Joi.string()
    .alphanum()
    .min(2)
    .max(100)
    .required()
});

module.exports = italy;