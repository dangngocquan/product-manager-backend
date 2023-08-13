const mysql = require('mysql2');
const dbconfig = require('../configs/dbconfig');
const helper = require('../utils/helper');

async function query(sql, params) {
    const connection = mysql.createConnection(dbconfig);
    const [results, ] = connection.execute(sql, params);
    return helper.emptyOrRows(results);
}

module.exports = {
    query: query,
}