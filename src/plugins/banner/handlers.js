'use strict';

const service = require('../../services/banner');
const { success, error } = require('../../utils/response');

module.exports = {
  add: async (request, h) => {
    const { payload } = request;
    console.log('LOL');
    const result = await service.add(payload);

    if (!result.success) return error(result.data);

    return success(result.data, 'Banner added');
  },

  getAll: async (request, h) => {
    const result = await service.getAll();

    if (!result.success) return error(result.data);

    return success(result.data, 'Success');
  },

  getById: async (request, h) => {
    const { params } = request;
    const { id } = params;

    const result = await service.get(id);

    if (!result.success) return error(result.data);

    return success(result.data, 'Success');
  },

  getAllActiveBannersForCustomer: async (request, h) => {
    const result = await service.getAllActiveBannersForCustomer();

    if (!result.success) return error(result.data);

    return success(result.data, 'Success');
  },

  editById: async (request, h) => {
    const { params, payload } = request;
    const { id } = params;

    const result = await service.editById(id, payload);

    if (!result.success) return error(result.data);

    return success(result.data, 'Banner edited');
  },

  removeById: async (request, h) => {
    const { params } = request;
    const { id } = params;

    const result = await service.removeById(id);

    if (!result.success) return error(result.data);

    return success(result.data, 'Banner removed');
  },
};
