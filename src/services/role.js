const auth = require('./auths');
const serviceShops = require('./shops');
const serviceProducts = require('./products');
const serviceCarts = require('./carts');

async function isAdmin(token) {
    const decoded = await auth.authenticateToken(token);
    return (decoded && decoded.type == 'admin');
}

async function isOwnerShop(token, shopId) {
    try {
        const decoded = await auth.authenticateToken(token);
        const informations = (await serviceShops.getInformationShop(shopId)).informations;
        if (informations.length > 0) {
            return (decoded && decoded.id == informations[0].owner_id);
        } else {
            return false;
        }
    } catch (err) {
        console.log("Error while checking owner of shop " + err.message);
        return false;
    }
    
}

async function isOwnerProduct(token, productId) {
    var shopId = (await serviceProducts.getProductsById(productId)).products[0].shop_id;
    return (await isOwnerShop(token, shopId));
}

module.exports = {
    isAdmin,
    isOwnerShop,
    isOwnerProduct
}