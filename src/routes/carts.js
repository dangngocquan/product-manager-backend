const express = require('express');
const router = express.Router();
const controller = require('../controllers/carts');


// [GET]




// [POST]
router.post('/', controller.addProduct);




// [PATCH]






// [DELETE]




module.exports = router;