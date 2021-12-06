'use strict';

const brand = require('./handlers');
const validators = require('./validators');

const attachmentPayload = {
  allow: 'multipart/form-data',
  maxBytes: 10485760,
  multipart: true,
  output: 'stream',
  timeout: 1000 * 30,
};

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/banners',
    handler: brand.add,
    options: {
      auth: false,
      validate: {},
    },
  },
  {
    method: 'GET',
    path: '/api/v1/banners',
    handler: brand.getAll,
    options: {
      auth: false,
      validate: {},
    },
  },
  {
    method: 'GET',
    path: '/api/v1/banners/{id}',
    handler: brand.getById,
  },
  {
    method: 'GET',
    path: '/api/v1/customer/banners',
    handler: brand.getAllActiveBannersForCustomer,
    options: {
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/banners/{id}',
    handler: brand.editById,
    options: {
      payload: attachmentPayload,
      validate: validators.edit,
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/banners/{id}',
    handler: brand.removeById,
  },
];
