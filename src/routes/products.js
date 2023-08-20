const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');


// [GET]
router.get('/categoryId/:categoryId', controller.getProductsByCategoryId)


// [POST]
router.post('/', controller.addNew);




// [PATCH]





// [DELETE]




module.exports = router;