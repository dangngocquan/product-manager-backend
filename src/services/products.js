const db = require('./db');
const role = require('./role');
const general = require('../configs/general');
const helper = require('../utils/helper');
const serviceCategories = require('./categories');

// [GET]
async function getProductsByCategoryId(categoryId, page = 0) {
    // const categories = (await serviceCategories.getChildrenOfCategoryById(categoryId)).categories;


    var sql = 
        `SELECT id, shop_id, name, image, price, currency, stock, EXTRACT(EPOCH FROM time_added) AS time_added, description ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id IN (` + 
            `SELECT product_id FROM products_of_categories ` + 
            `WHERE category_id = ${categoryId}` + 
        `)`;
    if (page > 0) {
        const limit = general.listPerPage;
        const offset = helper.getOffset(page, general.listPerPage);
        sql += `LIMIT ${limit} OFFSET ${offset}`
    }
    var products = await db.query(sql);

    var sqlCountPages = 
        `SELECT COUNT(*) ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id IN (` + 
            `SELECT product_id FROM products_of_categories ` + 
            `WHERE category_id = ${categoryId}` + 
        `)`;
    const countPages = Math.ceil(
        (await db.query(sqlCountPages))[0].count / general.listPerPage);

    return {
        countPages: countPages,
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


async function addProductImage(productId, image) {
    var sql = 
        `INSERT INTO product_images (product_id, image) ` + 
        `VALUES (${productId}, \'${image}\')`;
    await db.query(sql);
}

async function addProductVariation(productId, attributes = {}, price) {
    var sql = 
        `INSERT INTO product_variations (product_id, attributes, price) ` + 
        `VALUES (${productId}, \'${JSON.stringify(attributes)}\', ${price})`;
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
    addCategoryTypeForProduct,
    addProductImage,
    addProductVariation
}

