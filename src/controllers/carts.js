const service = require('../services/carts');
const auth = require('../services/auth');
const role = require('../services/role');

// [GET]



// [POST]


async function addProduct(req, res, next) {
    try {
        res.type('json');
        const decoded = await auth.authenticateToken(req.body.token);
        if (decoded) {
            await service.addProduct({
                "productId": req.body.productId,
                "productVariantId": req.body.productVariantId,
                "cartId": decoded.cart_id
            });
            res.status(201).send(JSON.stringify({
                "message": "Add new product to cart successfully."
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "message": "Authentication denied! Only owner of cart can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while creating new cart. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Create new cart failed."
        }));
        next(err);
    }
} 


async function getProducts(req, res, next) {
    try {
        res.type('json');
        const decoded = await auth.authenticateToken(req.body.token);
        if (decoded) {
            const products = (await service.getProducts(decoded.cart_id)).products;
            res.status(201).send(JSON.stringify({
                "message": "Get products of cart successfully.",
                "products": products
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "message": "Authentication denied! Only owner of cart can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while geting products of cart. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "message": "Get products of cart failed."
        }));
        next(err);
    }
} 






// [DELETE]




module.exports = {
    // [POST]
    addProduct,
    getProducts
}