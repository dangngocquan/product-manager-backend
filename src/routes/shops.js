const express = require('express');
const router = express.Router();
const controller = require('../controllers/shops');


// [GET]




// [POST]
router.post('/', controller.createNew);




// [PATCH]
router.patch('/', controller.update)






// [DELETE]




module.exports = router;