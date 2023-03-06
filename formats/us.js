const Joi = require('joi');

const us = Joi.object({
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

    state: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required(),

    zipcode: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .required(),

    country: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(3)
    .max(100)
    .required()
});

module.exports = us;

