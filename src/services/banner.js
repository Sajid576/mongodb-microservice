'use strict';

const db = require('../models');

const { add: uploadImage, remove: deleteImage } = require('../lib/file');
const { checkFileValidation } = require('../utils/validation');
const { getFileRandomName, getFileExtension } = require('../utils/file');
const logger = require('../utils/logger');
const _ = require('lodash');

const tag = 'banner.js';

module.exports = {
  add: async (payload) => {
    // console.debug('payload', payload);

    try {
      const result = await db.Banner.create(payload);

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ': add', error);

      return { success: false, data: error };
    }
  },

  getAll: async () => {
    try {
      const result = await db.Banner.find({});

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ': getAll', error);

      return { success: false, data: error };
    }
  },

  get: async (id) => {
    try {
      const result = await db.Banner.find({ _id: id });

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ': get', error);

      return { success: false, data: error };
    }
  },

  getAllActiveBannersForCustomer: async () => {
    try {
      const result = await db.Banner.find({ status: 'active' });

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ': getAllActiveBannersForCustomer', error);

      return { success: false, data: error };
    }
  },

  editById: async (id, payload) => {
    try {
      await db.Banner.updateOne(
        { _id: id },
        {
          $set: payload,
        }
      );

      const result = await db.Banner.findOne({ _id: id });

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ': get', error);

      return { success: false, data: error };
    }
  },

  removeById: async (id) => {
    try {
      const result = await db.Banner.findOne({ _id: id });

      if (!result)
        return {
          success: false,
          data: { name: 'notFound', message: 'Banner not found' },
        };

      deleteImage(result.imageClassic);
      deleteImage(result.imageFull);
      deleteImage(result.imageMobile);
      deleteImage(result.imageFlutterApp);

      await db.Banner.deleteOne({ _id: id });

      return { success: true, data: null };
    } catch (error) {
      logger.error(tag + ': removeById', error);

      return { success: false, data: error };
    }
  },
};
