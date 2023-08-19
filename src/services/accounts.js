const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]




// [POST]
async function createNewAccount(formData) {
    var sql = 
        `INSERT INTO accounts (username, password) ` + 
        `VALUE (\'${formData.username}\', \'${formData.password}\')`;

    await db.query(sql);
}



// [PATCH]




// [DELETE]




module.exports = {
    // [POST]
    createNewAccount
}