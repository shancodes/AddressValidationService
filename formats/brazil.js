const Joi = require('joi');
const pattern = /^[a-zA-Z0-9\s]+$/;

const brazil = Joi.object({
    name: Joi.string()
    .min(3)
    .max(100)
    .required(),

    addressLine1: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .required(),

    addressLine2: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/)),

    city: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required(),

    pincode: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(5)
    .required(),

    country: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required()
});

module.exports = brazil;