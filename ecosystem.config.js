module.exports = {
  apps: [
    {
      name: 'my-node-app', // PM2 app name
      script: 'npm', // Use npm as the command
      args: 'start', // Pass "start" as the argument
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
