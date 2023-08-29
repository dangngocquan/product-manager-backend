const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');


// [GET]
router.get('/check-username', controller.checkExistUsername);
router.get('/informations', controller.getInformationsByToken);



// [POST]
router.post('/', controller.createNew);
router.post('/login', controller.loginAccount);




// [PATCH]





// [DELETE]




module.exports = router;