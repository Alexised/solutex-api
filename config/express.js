'use strict';
/**
 * Express configuration.
 */

const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

module.exports = (app) => {
  const env = app.get('env');

  app.use(cors());
  // app.use((_req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  //   );
  //   next();
  // });

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(methodOverride());
  app.use(logger('dev'));
  app.use(passport.initialize());

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
};
