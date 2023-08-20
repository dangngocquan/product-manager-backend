const service = require('../services/products');
const role = require('../services/role');


// [GET]


// [POST]
async function addNew(req, res, next) {
    try {
        res.type('json');
        if (await role.isOwnerShop(req.body.token, req.body.data.shop_id)) {
            await service.addNewProduct(req.body.data);
            res.send(JSON.stringify({
                "status": 1,
                "message": "Add new product successfully."
            }));
        } else {
            res.send(JSON.stringify({
                "status": 1,
                "message": "Authentication denied! Only owner of shop can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while adding new product. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Add new product failed."
        }));
        next(err);
    }
}


// [PATCH]



// [DELETE]


module.exports = {
    // [POST]
    addNew
}