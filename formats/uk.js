const Joi = require('joi');

const uk = Joi.object({
    fullName: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required(),

    addressLine1: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required(),

    addressLine2: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/)),

    city: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required(),

    postalcode: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .required(),

    country: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required()
});

module.exports = uk;