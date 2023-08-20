const auth = require('./auth');
const serviceShops = require('./shops');

async function isAdmin(token) {
    const decoded = await auth.authenticateToken(token);
    return (decoded && decoded.type == 'admin');
}

async function isOwnerShop(token, shopId) {
    const decoded = await auth.authenticateToken(token);
    const [informationShop, ] = (await serviceShops.getInformationShop(shopId)).informations;
    return (decoded && decoded.id == informationShop.owner_id);
    
}

module.exports = {
    isAdmin,
    isOwnerShop
}