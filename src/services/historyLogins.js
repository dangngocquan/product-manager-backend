const db = require('./db');

// [POST]

async function insertHistory(accountId) {
    var sql = 
        `INSERT INTO history_logins (account_id) ` +
        `VALUES (${accountId})`;

    await db.query(sql);
}


module.exports = {
    insertHistory
}