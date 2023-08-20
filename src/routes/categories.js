const express = require('express');
const router = express.Router();
const controllerCategories = require('../controllers/categories');



// [GET]
router.get('/page/:page', controllerCategories.getByPage);
router.get('/id/:id', controllerCategories.getById);
router.get('/level/:level', controllerCategories.getByLevel);
router.get('/id/:id/children', controllerCategories.getChildren);
router.get('/tree', controllerCategories.getTree);



// [POST] 
router.post('/', controllerCategories.createNew);



// [PATCH]
router.patch('/', controllerCategories.updateById);



// [DELETE]
router.delete('/', controllerCategories.deleteById);





module.exports = router;

