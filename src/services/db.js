const Sequelize = require('sequelize');
const dbconfig = require('../configs/dbconfig');

const db = new Sequelize(dbconfig);

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;