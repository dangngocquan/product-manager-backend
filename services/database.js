const mysql = require('mysql2/promise');
const config = require('../configs/config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

modulr.exports = {
    query
};