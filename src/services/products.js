const db = require('./db');
const role = require('./role');
const general = require('../configs/general');
const helper = require('../utils/helper');
const serviceCategories = require('./categories');

// [GET]
async function getProductsByCategoryId(categoryId = 0, page = 0) {
    const categories = (await serviceCategories.getCategoriesTree(categoryId)).categoriesArray;
    const categoryIds = categories.map((category) => category.id);
    var categoryIdsSQL = '(' + categoryIds.join(', ') + ')';

    var sql = 
        `SELECT id, shop_id, name, image, price, currency, stock, EXTRACT(EPOCH FROM time_added) AS time_added, description ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id IN (` + 
            `SELECT product_id FROM products_of_categories ` + 
            `WHERE category_id IN ${categoryIdsSQL} ` + 
        `) `;
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
            `WHERE category_id IN ${categoryIdsSQL} ` + 
        `) `;
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

async function getProductInformationsById(id) {
    var sql = 
        `SELECT id, shop_id, name, image, price, currency, stock, EXTRACT(EPOCH FROM time_added) AS time_added, description ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id = ${id}`;

    var products = await db.query(sql);


    var sql1 = 
        `SELECT id, product_id, image ` + 
        `FROM product_images ` + 
        `WHERE product_id = ${id}`;

    var productImages = await db.query(sql1);

    var sql2 = 
        `select pv.id as id,
            pv.price as price,
            array_agg(vv.id) as variant_value_ids,
            array_agg(vv.value) as variant_value_names,
            array_agg(v.id) as variant_ids,
            array_agg(v.variant_name) as variant_names from (
                (
                    product_variants as pv join product_variant_details as pvd on pv.id = pvd.product_variant_id
                ) join variant_values as vv on pvd.variant_value_id = vv.id
            ) join variants as v on vv.variant_id = v.id where product_id = ${id} group by pv.id`;

    var productVariations = await db.query(sql2);

    return {
        products: products,
        productsImages: productImages,
        productVariations: productVariations
    }
}


async function getLastestProductsByCategoryId(categoryId = 0) {
    const categories = (await serviceCategories.getCategoriesTree(categoryId)).categoriesArray;
    const categoryIds = categories.map((category) => category.id);
    var categoryIdsSQL = '(' + categoryIds.join(', ') + ')';

    var sql = 
        `SELECT id, shop_id, name, image, price, currency, stock, EXTRACT(EPOCH FROM time_added) AS time_added, description, sold ` + 
        `FROM products ` + 
        `WHERE status = \'normal\' AND id IN (` + 
            `SELECT product_id FROM products_of_categories ` + 
            `WHERE category_id IN ${categoryIdsSQL} ` + 
        `) ` + 
        `ORDER BY time_added DESC `;

    const limit = general.limitLastest;
    const offset = helper.getOffset(1, general.limitLastest);
    sql += `LIMIT ${limit} OFFSET ${offset}`;

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
    var attributeKeys = [...Object.keys(attributes)];
    var sql1 =
        `insert into product_variants (
            product_id, 
            price
        ) values (
            ${productId}, 
            ${price}
        ) returning id`
    var [id,] = await db.query(sql1);
    // console.log(id); // { id: '3' }

    for (key of attributeKeys) {
        var sql = 
            `with variants_id as (
                insert into variants (
                    variant_name
                ) values (
                    '${key}'
                ) on conflict (
                    variant_name
                ) do update set variant_name = EXCLUDED.variant_name returning id
            ),
            variant_values_id as (
                insert into variant_values (
                    variant_id, 
                    value
                ) values (
                    (select id from variants_id),
                    '${attributes[key]}'
                ) on conflict (
                    variant_id, 
                    value
                ) do update set variant_id = EXCLUDED.variant_id, 
                                value = EXCLUDED.value returning id
            ) insert into product_variant_details (
                    product_variant_id, 
                    variant_value_id
                ) values (
                    ${id.id},
                    (select id from variant_values_id)
                )`;

        await db.query(sql);
    }
}

// [PATCH]




// [DELETE]



module.exports = {
    // [GET]
    getProductsByCategoryId,
    getProductsById,
    getLastestProductsByCategoryId,
    getProductInformationsById,
    // [POST]
    addNewProduct,
    addCategoryTypeForProduct,
    addProductImage,
    addProductVariation
}

