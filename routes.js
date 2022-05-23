'use strict';
/**
 * Main application routes
 */
module.exports = (app) => {
  app.use('/api/users', require('./src/users'));
  app.use('/api/operation', require('./src/operation'));


};
