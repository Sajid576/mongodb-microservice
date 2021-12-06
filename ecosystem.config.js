module.exports = {
  apps: [
    {
      name: 'mongodb-microservice',
      script: './src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      ignore_watch: ['node_modules'],
    },
  ],
};
