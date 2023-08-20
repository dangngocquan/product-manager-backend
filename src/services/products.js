const db = require('./db');
const role = require('./role');

// [GET]



// [POST]
async function addNewProduct(formData = {}) {
    var sql = 
        `INSERT INTO products (shop_id, name, image, price, stock, description) ` + 
        `VALUES (${formData.shop_id}, \'${formData.name}\', \'${formData.image}\', ` + 
        `\'${formData.price}\', ${formData.stock}, \'${formData.description}\')`;

    await db.query(sql);
}


// [PATCH]




// [DELETE]



module.exports = {
    // [POST]
    addNewProduct
}

