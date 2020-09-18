const db = require('../../utils/db/index');
const logger = require('../../utils/logger');

function registerUser(user) {
  return new Promise((resolve, reject) => {
    db.getConnectionFromPool().then((connection, error) => {
      if (error) {
        reject(error);
      } else {
        // eslint-disable-next-line no-console
        console.log(user);
        const sql = `INSERT INTO userinfo (name, role, email, password, DOB, phone) VALUES ( "${user.name}", "${user.role}","${user.email}","${user.password}","${user.DOB}" ,"${user.phone}")`;
        // eslint-disable-next-line no-unused-vars
        connection.query(sql, (err, result) => {
          if (err) {
            logger.error(err);
            reject(err);
            throw err;
          } else {
            resolve();
          }
          db.closeConnection(connection);
        });
      }
    });
  });
}

function existingUser(email, phone) {
  return new Promise((resolve, reject) => {
    this.db.getConnectionFromPool().then((connection, error) => {
      if (error) {
        logger.error(error);
        reject(error);
        throw error;
      } else {
        const sql = `SELECT userId FROM userinfo WHERE email = "${email}" OR phone = "${phone}" `;
        connection.query(sql, (err, result) => {
          if (err) {
            reject();
          } else {
            resolve(result);
          }
        });
      }
      db.connection.closeConnection(connection);
    });
  });
}

module.exports = { registerUser, existingUser };
