const axios = require('axios');
const https = require('https');
const { API_BASE_URL } = require('../utils/env');

const timeout = 10000;
const validateStatus = (status) => status >= 200 && status < 300;
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout,
    validateStatus,
    httpsAgent,
  });

  instance.defaults.onDownloadProgress = (progressEvent) => {};

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return error.response && error.response.data
        ? error.response.data
        : error.response;
    }
  );

  return instance;
};
