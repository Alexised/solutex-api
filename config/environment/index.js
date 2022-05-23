'use strict';
/**
 * Default specific configuration.
 */

require('dotenv').config();

/**
 * @namespace
 * @property {string} env                 - Default value for environment.
 * @property {number} port                - Default value of port.
 * @property {string} host                - Default value for the host address.
 * @property {string} secrets             - Default value for secrets.
 * @property {string} secrets.session     - Default value for session secret.
 * @property {object} postgresql          - Default value for postgresql connection.
 * @property {string} postgresql.host     - Default value for host postgresql.
 * @property {string} postgresql.port     - Default value for port postgresql.
 * @property {string} postgresql.user     - Default value for user postgresql.
 * @property {string} postgresql.password - Default value for password postgresql.
 * @property {string} postgresql.database - Default value for database name.
 */
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  host: process.env.HOST || '127.0.0.1',
  secrets: { session: 'full5tack-j4v45cr1pt' },
  postgresql: {
    host: process.env.POSTGRES_HOST || 'solutex.cxlkhv4tofum.us-east-2.rds.amazonaws.com',
    port: process.env.PROCESS_PORT || '5432',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'alexis123',
    database: process.env.POSTGRES_DATABASE || 'solutex',
  },
  application: {
    cors: { server: [{ origin: '*', credentials: true }] },
  },
};
