const service = require('../services/shops');
const auth = require('../services/auth');
const role = require('../services/role');

// [GET]




// [POST]
async function createNew(req, res, next) {
    try {
        const decoded = await auth.authenticateToken(req.body.token);
        var formData = {
            "ownerId": decoded.id,
            "username": req.body.username,
            "brandName": req.body.brandName
        }
        await service.createNewShop(formData);
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": "Create new shop successfully."
        }));
    } catch (err) {
        console.error("Error while creating new shop. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Create new shop failed."
        }));
        next(err);
    }
} 



// [PATCH]
async function update(req, res, next) {
    try {
        res.type('json');
        if (await role.isOwnerShop(req.body.token, req.body.shopId)) {
            await service.updateShopById(req.body.shopId, req.body.newData);
            res.send(JSON.stringify({
                "status": 1,
                "message": "Update shop successfully."
            }));
        } else {
            res.send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only owner of shop can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while updating shop. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Update shop failed."
        }));
        next(err);
    }
} 




// [DELETE]




module.exports = {
    // [POST]
    createNew,
    // [PATCH]
    update
}