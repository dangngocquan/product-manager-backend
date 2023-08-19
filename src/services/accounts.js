const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]




// [POST]
async function createNewAccount(formData = {}) {
    var sql = 
        `INSERT INTO accounts (username, password) ` + 
        `VALUES (\'${formData.username}\', \'${formData.password}\') ` + 
        `RETURNING id`;

    var [account, ] = await db.query(sql);
    return account.id;
}



// [PATCH]




// [DELETE]




module.exports = {
    // [POST]
    createNewAccount
}