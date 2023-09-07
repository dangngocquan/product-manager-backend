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




// [PATCH]



// [DELETE]



module.exports = {
    addProduct
}
