const db = require('./db');

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

async function loginAccount(formData) {
    var sql = 
        `WITH account AS (` + 
            `SELECT ` + 
                `id, username, password, status, type, EXTRACT(EPOCH FROM time_registered) AS time_registered ` +
            `FROM accounts ` + 
            `WHERE status != 'deleted' AND username = '${formData.username}' AND password = '${formData.password}'` +
        `) ` +
        `SELECT ` + 
            `account.id AS id, username, password, status, type, time_registered, ` +
            `nickname, email, phone_number, gender, EXTRACT(EPOCH FROM birthday) AS birthday, portrait ` +
        `FROM account JOIN clients ON account.id = clients.account_id`;

    const accountInformations = await db.query(sql);
    return {
        accountInformations: accountInformations
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
    loginAccount,
    // [POST]
    createNewAccount
}