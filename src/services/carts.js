const db = require('./db');


// [GET]





// [POST]
async function addProduct(formData = {}) {
    // formData = {
    //     "productId": 1,
    //     "productVariantId": 1,
    //     "cartId": 1
    // }
    var sql = 
        `insert into products_of_carts (
            product_id, 
            product_variant_id, 
            cart_id) values (
            ${formData["productId"]},
            ${formData["productVariantId"]},
            ${formData["cartId"]})`;
        
    await db.query(sql);
}

async function getProducts(cartId) {
    var sql =
        `select poc.id as id_in_cart,
            p.id as product_id,
            poc.product_variant_id as product_variant_id,
            p.name,
            p.image,
            p.currency,
            p.price as base_price,
            pv.price as variant_price from (
                products_of_carts as poc join products as p on poc.product_id = p.id 
            ) left join product_variants as pv on poc.product_variant_id = pv.id where cart_id = ${cartId}`;

    const products = await db.query(sql);

    return {
        "products": products
    }
}




// [PATCH]



// [DELETE]



module.exports = {
    addProduct,
    getProducts
}
