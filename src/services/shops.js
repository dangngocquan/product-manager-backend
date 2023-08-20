const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]
async function getInformationShop(id) {
    var sql = 
        `SELECT ` +
            `id, owner_id , username, brand_name, EXTRACT(EPOCH FROM time_created), logo, status ` +
        `FROM shops ` + 
        `WHERE id = ${id}`;
    
    const informations = await db.query(sql);

    return {
        informations
    }
}


// [POST]
async function createNewShop(formData = {}) {
    // Insert into table `accounts`
    var sql = 
        `INSERT INTO shops (owner_id, username, brand_name) ` + 
        `VALUES (${formData.ownerId}, \'${formData.username}\', \'${formData.brandName}\')`;
    
    await db.query(sql);
}




// [PATCH]
async function updateShopById(id = 0, formData = {}) {
    var newData = [];
    for (var key in formData) {
        if (typeof formData[key] === 'string') {
            newData.push(key + " = \'" + formData[key] + "\'");
        } else if (typeof formData[key] === 'number') {
            newData.push(key + " = " + formData[key]);
        }
    }
    newData = newData.join(", ");
    var sql = 
        `UPDATE shops ` + 
        `SET ${newData} ` +
        `WHERE id = ${id}`;
    await db.query(sql); 
}


// [DELETE]



module.exports = {
    // [GET]
    getInformationShop,
    // [POST]
    createNewShop,
    // [PATCH]
    updateShopById
}
