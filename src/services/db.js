const {Client} = require('pg');
const dbconfig = require('../configs/dbconfig');
const helper = require('../utils/helper');

async function query(sql) {
    try {
        const client = new Client(dbconfig);
        await client.connect();
        console.log("Connected to database");
        const results = await client.query(sql);
        await client.end();
        return helper.emptyOrRows(results.rows);
    } catch (e) {
        console.log(e);
    }
    
}

module.exports = {
    query: query,
}