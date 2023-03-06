const Joi = require('joi');

const denmark = Joi.object({
    fullName: Joi.string()
    .min(2)
    .max(100)
    .required(),

    addressLine1: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required(),

    addressLine2: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/)),

    district: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(2)
    .max(100)
    .required(),

    zipcode: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .required(),

    country: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(2)
    .max(100)
    .required()
});

module.exports = denmark;