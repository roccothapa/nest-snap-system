module.exports = {
  apps: [
    {
      name: 'tali-backend-stg',
      script: 'dist/src/main.js',
      watch: true,
      force: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
};
