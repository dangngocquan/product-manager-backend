const express = require('express');
const router = express.Router();
const controller = require('../controllers/sliders');


// [GET]
router.get('/', controller.getSliders);



// [POST]
router.post('/', controller.addNew);




// [PATCH]





// [DELETE]




module.exports = router;