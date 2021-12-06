'use strict';

const { SECRET_KEY } = require('../utils/env');

exports.plugin = {
  name: 'authentication',
  version: '1.0.0',
  register: (server) => {
    server.auth.strategy('jwt', 'jwt', {
      key: SECRET_KEY,
      validate: async function (decoded, request, h) {
        if (!decoded.phoneNumber && !decoded.email)
          return { isValid: false };

        return { isValid: true };
      },
      verifyOptions: { algorithms: ['HS256'], ignoreExpiration: true },
    });

    server.auth.default('jwt');
  },
};
