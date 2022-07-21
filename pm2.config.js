module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/main.js',
      exec_mode: 'fork',
    },
  ],
};
