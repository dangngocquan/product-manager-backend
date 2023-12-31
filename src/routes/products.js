const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');


// [GET]
router.get('/categoryId/:categoryId/page/:page/order/:order/sortBy/:sortBy', controller.getProductsByCategoryId);
router.get('/lastest/categoryId/:categoryId', controller.getLastestProductsByCategoryId);
router.get('/id/:id', controller.getProductInformationsById);


// [POST]
router.post('/', controller.addNew);
router.post('/category-type', controller.addCategoryTypeForProduct);
router.post('/images', controller.addProductImage);
router.post('/variations', controller.addProductVariation);




// [PATCH]





// [DELETE]




module.exports = router;