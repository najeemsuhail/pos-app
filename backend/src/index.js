const { startServer } = require('./server');

startServer(process.env.PORT || 5000).catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
