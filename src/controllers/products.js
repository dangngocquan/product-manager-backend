const service = require('../services/products');
const role = require('../services/role');


// [GET]
async function getProductsByCategoryId(req, res, next) {
    try {
        var products = (await service.getProductsByCategoryId(req.params.categoryId)).products;
        res.type('json');
        res.status(200).send(JSON.stringify({
            "status": 1,
            "message": "Get products successfully.",
            "products": products
        }));  
    } catch (err) {
        console.error("Error while getting products. ",  err.message);
        res.status(500).type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Get products failed."
        }));
        next(err);
    }
}


// [POST]
async function addNew(req, res, next) {
    try {
        res.type('json');
        if (await role.isOwnerShop(req.body.token, req.body.data.shop_id)) {
            await service.addNewProduct(req.body.data);
            res.status(200).send(JSON.stringify({
                "status": 1,
                "message": "Add new product successfully."
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only owner of shop can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while adding new product. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "status": 0,
            "message": "Add new product failed."
        }));
        next(err);
    }
}



async function addCategoryTypeForProduct(req, res, next) {
    try {
        res.type('json');
        if (await role.isOwnerProduct(req.body.token, req.body.product_id)) {
            await service.addCategoryTypeForProduct(req.body.product_id, req.body.category_id);
            res.status(200).send(JSON.stringify({
                "status": 1,
                "message": "Add category type for product successfully."
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only owner of product can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while adding category type for product. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "status": 0,
            "message": "Add category type for product failed."
        }));
        next(err);
    }
}


async function addProductImage(req, res, next) {
    try {
        res.type('json');
        if (await role.isOwnerProduct(req.body.token, req.body.product_id)) {
            await service.addProductImage(req.body.product_id, req.body.image);
            res.status(200).send(JSON.stringify({
                "status": 1,
                "message": "Add product image successfully."
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only owner of product can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while adding category type for product. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "status": 0,
            "message": "Add product image failed."
        }));
        next(err);
    }
}



async function addProductVariation(req, res, next) {
    try {
        res.type('json');
        if (await role.isOwnerProduct(req.body.token, req.body.product_id)) {
            await service.addProductVariation(req.body.product_id, req.body.attributes, req.body.price);
            res.status(200).send(JSON.stringify({
                "status": 1,
                "message": "Add product variation successfully."
            }));
        } else {
            res.status(401).send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only owner of product can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while adding product variation. ",  err.message);
        res.type('json');
        res.status(500).send(JSON.stringify({
            "status": 0,
            "message": "Add product variation failed."
        }));
        next(err);
    }
}

// [PATCH]



// [DELETE]


module.exports = {
    // [GET]
    getProductsByCategoryId,
    // [POST]
    addNew,
    addCategoryTypeForProduct,
    addProductImage,
    addProductVariation
}