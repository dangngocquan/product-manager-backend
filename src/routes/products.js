const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');


// [GET]
router.get('/categoryId/:categoryId', controller.getProductsByCategoryId)


// [POST]
router.post('/', controller.addNew);
router.post('/category-type', controller.addCategoryTypeForProduct);
router.post('/images', controller.addProductImage);




// [PATCH]





// [DELETE]




module.exports = router;