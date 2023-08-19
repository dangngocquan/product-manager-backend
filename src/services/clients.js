const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]




// [POST]
async function createNewClient(formData) {
    var data = [];
    for (var key in formData) {
        if (typeof formData[key] === 'string') {
            data.push(key + " = \'" + formData[key] + "\'");
        } else if (typeof formData[key] === 'number') {
            data.push(key + " = " + formData[key]);
        }
    }
    data = data.join(", ");
    var sql = 
        `INSERT INTO accounts (account_id, nickname, email, phone_number, gender, birthday, portrait) ` + 
        `VALUES (${data})`;

    await db.query(sql);
}



// [PATCH]




// [DELETE]




module.exports = {
    // [POST]
    createNewClient,
}