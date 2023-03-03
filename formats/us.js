const Joi = require('joi');

const us = Joi.object({
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

    state: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    zipcode: Joi.string().pattern(new RegExp('^[0-9]$'))
    .required(),

    country: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required()
});

module.exports = us;

