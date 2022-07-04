module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
    },
  ],
};
