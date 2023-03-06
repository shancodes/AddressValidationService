const Joi = require('joi');

const canada = Joi.object({
    fullName: Joi.string()
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

    province: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(1)
    .max(100)
    .required(),

    pincode: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .required(),

    country: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(2)
    .max(100)
    .required()
});

module.exports = canada;