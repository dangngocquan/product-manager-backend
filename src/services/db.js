const mysql = require('mysql2/promise');
const dbconfig = require('../configs/dbconfig');
const helper = require('../utils/helper');

async function query(sql, params) {
    const connection = await mysql.createConnection(dbconfig);
    const [results, ] = await connection.execute(sql, params);
    return helper.emptyOrRows(results);
}

module.exports = {
    query: query,
}