const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');


// [GET]



// [POST]
router.post('/', controller.addNew);




// [PATCH]





// [DELETE]




module.exports = router;