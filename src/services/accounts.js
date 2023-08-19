const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]
async function getIdByUsername(username) {
    var sql =   
        `SELECT id FROM accounts ` +
        `WHERE status != 'deleted' AND username = '${username}'`;
    
    var ids = await db.query(sql);
    return {
        ids
    }
}



// [POST]
async function createNewAccount(formData = {}) {
    // Insert into table `accounts`
    var sql = 
        `WITH new_account AS (` + 
        `    INSERT INTO accounts (username, password) ` + 
        `    VALUES (\'${formData.username}\', \'${formData.password}\') ` + 
        `    RETURNING id` + 
        `) ` + 
        `INSERT INTO clients (account_id, nickname, email, phone_number, gender, birthday, portrait) ` + 
        `VALUES (` +
            `(SELECT id FROM new_account), ` + 
            `\'${formData.nickname}\', ` + 
            `\'${formData.email}\', ` + 
            `\'${formData.phone_number}\', ` +
            `\'${formData.gender}\', ` +
            `TO_TIMESTAMP(${formData.birthday}), ` + 
            `\'${formData.portrait}\'` + 
        `)`;
    
    await db.query(sql);
}



// [PATCH]




// [DELETE]




module.exports = {
    // [GET]
    getIdByUsername,
    // [POST]
    createNewAccount
}