'use strict';
/**
 * Main application file
 */

const http = require('http');
const express = require('express');

const routesConfig = require('./routes');
const expressConfig = require('./config/express');
const { port, host } = require('./config/environment');

/**
 * Setup server
 */
const app = express();
const server = http.createServer(app);

expressConfig(app);
routesConfig(app);

/**
 * Start server
 */
function startServer() {
  app.townHall = server.listen(port, (error) => {
    error
      ? console.log(
          `[${new Date().toLocaleString()}] Error starting API Service: ${error}`
        )
      : null;
    console.log(
      `[${new Date().toLocaleString()}] API Service listening on port ${port}, in ${app.get(
        'env',
      )} mode: \x1b[32m%s\x1b[0m`,
      'online',
    );
  });
}
setImmediate(startServer);

/**
 * Expose app
 */
module.exports = app;
