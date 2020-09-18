/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
const mysql = require('mysql');
const config = require('./dbConfig.json');
const logger = require('../logger/index');

let pool;

function initializeConnectionPool() {
  if (!pool) {
    logger.info('initializing pool connection');
    pool = mysql.createPool({
      connectionLimit: config.connectionLimit,
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.databaseName,
    });
  } else {
    logger.info('pool connection already initialized');
  }
}

function getConnectionFromPool() {
  if (!pool) {
    initializeConnectionPool();
  }
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        logger.error('unable  to get connection from pool');
        logger.error(err);
        reject(err);
        throw err;
      } else {
        logger.info('giving a connecton from pool');
        resolve(connection);
      }
    });
  });
}

function closeConnection(connection) {
  if (!connection) {
    logger.log('connection does not exist');
  }
  try {
    logger.info('releasing db connection');
    connection.release();
  } catch (err) {
    logger.error('Unable to release db connection');
    logger.error('error');
  }
}

function closePool() {
  if (!pool) {
    logger.error('Unable to close pool as it does not exist');
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) {
        logger.error('unable to releasse db connection');
        logger.error(err);
        reject(err);
      } else {
        logger.info('succesfully closed connection pool');
        resolve();
      }
    });
  });
}

module.exports = { closePool, closeConnection, getConnectionFromPool };
