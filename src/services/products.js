const db = require('./db');
const role = require('./role');

// [GET]
async function getProductsByCategoryId(categoryId) {
    var sql = 
        `SELECT id, shop_id, name, image, price, currency, stock, EXTRACT(EPOCH FROM time_added) AS time_added, description ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id IN (` + 
            `SELECT product_id FROM products_of_categories ` + 
            `WHERE category_id = ${categoryId}` + 
        `)`;

    var products = await db.query(sql);

    return {
        products: products
    }
}

async function getProductsById(id) {
    var sql = 
        `SELECT id, shop_id, name, image, price, currency, stock, EXTRACT(EPOCH FROM time_added) AS time_added, description ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id = ${id}`;

    var products = await db.query(sql);

    return {
        products: products
    }
}



// [POST]
async function addNewProduct(formData = {}) {
    var sql = 
        `INSERT INTO products (shop_id, name, image, price, stock, description) ` + 
        `VALUES (${formData.shop_id}, \'${formData.name}\', \'${formData.image}\', ` + 
        `\'${formData.price}\', ${formData.stock}, \'${formData.description}\')`;

    await db.query(sql);
}

async function addCategoryTypeForProduct(productId, categoryId) {
    var sql = 
        `INSERT INTO products_of_categories (category_id, product_id) ` + 
        `VALUES (${categoryId}, ${productId})`;
    await db.query(sql);
}


// [PATCH]




// [DELETE]



module.exports = {
    // [GET]
    getProductsByCategoryId,
    getProductsById,
    // [POST]
    addNewProduct,
    addCategoryTypeForProduct
}

