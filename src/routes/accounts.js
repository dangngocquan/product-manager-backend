const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');


// [GET]
router.get('/check-username', controller.checkExistUsername);



// [POST]
router.post('/', controller.createNew);




// [PATCH]





// [DELETE]




module.exports = router;