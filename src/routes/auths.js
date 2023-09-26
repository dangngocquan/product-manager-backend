const express = require('express');
const router = express.Router();
const controller = require('../controllers/auths');


// [GET]




// [POST]
router.post('/', controller.getGoogleProfile);




// [PATCH]






// [DELETE]




module.exports = router;