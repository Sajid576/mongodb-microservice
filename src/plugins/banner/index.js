'use strict';

exports.plugin = {
  name: 'banner',
  version: '1.0.0',
  register: (server) => {
    server.route(require('./routes'));
  },
};
