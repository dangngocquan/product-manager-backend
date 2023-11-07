const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');


// [GET]
router.get('/check-username', controller.checkExistUsername);



// [POST]
router.post('/', controller.createNew);
router.post('/new/google', controller.createNewWithGoogle);
router.post('/login', controller.loginAccount);
router.post('/login/google', controller.loginAccountWithGoogle);
router.post('/informations', controller.getInformationsByToken);
router.post('/update-portrait', controller.updatePortraitAccount);




// [PATCH]





// [DELETE]




module.exports = router;