require('dotenv').config();
const app = require('./app');
const { initializeDatabase } = require('./db/init');

function normalizePort(value) {
  const port = Number.parseInt(value, 10);

  if (Number.isNaN(port) || port <= 0) {
    return 5000;
  }

  return port;
}

async function startServer(port = process.env.PORT) {
  const resolvedPort = normalizePort(port);
  await initializeDatabase();
  const server = app.listen(resolvedPort, () => {
    console.log(`POS Backend running on port ${resolvedPort}`);
  });

  return { app, port: resolvedPort, server };
}

module.exports = {
  app,
  startServer,
};
