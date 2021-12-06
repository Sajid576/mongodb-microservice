'use strict';

const { POST, DELETE } = require('./api');
const { saveTempFile, getTempFile, deleteTempFile } = require('../utils/file');
const FormData = require('form-data');

module.exports = {
  add: async (folderName, file, fileName, fileExtension) => {
    if (!folderName || !file || !fileName | fileExtension) return false;

    await saveTempFile(file, fileName, fileExtension);

    const formData = new FormData();

    formData.append('folderName', folderName);
    formData.append('fileName', fileName);
    formData.append('file', getTempFile(fileName, fileExtension));
    formData.append('allowedExtensions', 'png');
    formData.append('allowedExtensions', 'jpg');
    formData.append('allowedExtensions', 'jpeg');

    await deleteTempFile(fileName, fileExtension);

    const response = await POST(
      '/storage/content/add-file',
      formData,
      null,
      `multipart/form-data; boundary=${formData._boundary}`
    );
    // console.debug('response: post', response);

    if (!response)
      throw {
        name: 'badImplementation',
      };

    if (response.statusCode === 400)
      throw {
        name: 'badRequest',
        message: response.message,
      };

    if (response.statusCode !== 200)
      throw {
        name: 'badImplementation',
      };

    return true;
  },

  remove: async (imageUrl) => {
    if (!imageUrl) return false;

    const response = await DELETE('/storage/content' + imageUrl);
    // console.debug('response: delete', response);

    if (!response)
      throw {
        name: 'badImplementation',
      };

    if (response.statusCode !== 200)
      throw {
        name: 'badImplementation',
      };

    return true;
  },
};
