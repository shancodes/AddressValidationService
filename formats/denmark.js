const Joi = require('joi');

const denmark = Joi.object({
    fullName: Joi.string()
    .alphanum()
    .min(2)
    .max(100)
    .required(),

    addressLine1: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    addressLine2: Joi.string()
    .alphanum(),

    district: Joi.string()
    .alphanum()
    .min(2)
    .max(100)
    .required(),

    zipcode: Joi.string()
    .alphanum()
    .required(),

    country: Joi.string()
    .alphanum()
    .min(2)
    .max(100)
    .required()
});

module.exports = denmark;