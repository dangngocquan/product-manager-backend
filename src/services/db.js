const mysql = require('mysql2/promise');
const dbconfig = require('../configs/dbconfig');

async function query(sql, params) {
    const connection = await mysql.createConnection(dbconfig);
    const [results, ] = await connection.execute(sql, params);
    return results;
}

module.exports = {
    query: query,
}