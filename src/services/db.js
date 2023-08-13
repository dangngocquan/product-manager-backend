const Sequelize = require('sequelize');
const dbconfig = require('../configs/dbconfig');

const db = new Sequelize(dbconfig);

module.exports = db;