const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');


// [GET]
router.get('/check-username', controller.checkExistUsername);



// [POST]
router.post('/', controller.createNew);
router.post('/login', controller.loginAccount);
router.post('/informations', controller.getInformationsByToken);




// [PATCH]





// [DELETE]




module.exports = router;