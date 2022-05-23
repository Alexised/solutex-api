'use strict';
/**
 * Database configuration file
 */

const pg = require('pg');
const { postgresql } = require('./config/environment');

const pool = new pg.Pool({
  host: postgresql.host,
  port: postgresql.port,
  user: postgresql.user,
  password: postgresql.password,
  database: postgresql.database,
});

module.exports = { pool };
