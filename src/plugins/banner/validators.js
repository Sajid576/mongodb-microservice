const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Relish = require('relish')({
  messages: {},
});
const { options } = require('../../utils/validation');

const payload = {
  name: Joi.string().max(255).required().trim(),
  // title: Joi.string().max(255).allow(null).allow(''),
  // body: Joi.string().max(255).allow(null).allow(''),
  // buttonText: Joi.string().max(255).allow(null).allow(''),
  // buttonUrl: Joi.string().max(255).allow(null).allow(''),
  // url: Joi.string().max(255).allow(null).allow(''),
  // imageClassic: Joi.any().allow(null),
  // imageFull: Joi.any().allow(null),
  // imageMobile: Joi.any().allow(null),
  // imageFlutterApp: Joi.any().allow(null),
  // status: Joi.string().max(255).required().lowercase().trim(),
};

const failAction = Relish.failAction;

module.exports = {
  add: {
    payload: Joi.object().keys(payload),
    options,
    failAction,
  },

  edit: {
    payload: Joi.object().keys(payload),
    options,
    failAction,
  },
};
