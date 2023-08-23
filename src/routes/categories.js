const express = require('express');
const router = express.Router();
const controllerCategories = require('../controllers/categories');



// [GET]
router.get('/id/:id', controllerCategories.getById);
router.get('/level/:level/page/:page', controllerCategories.getByLevel);
router.get('/id/:id/children/page/:page', controllerCategories.getChildren);
router.get('/tree/rootCategoryId/:rootCategoryId', controllerCategories.getTree);



// [POST] 
router.post('/', controllerCategories.createNew);



// [PATCH]
router.patch('/', controllerCategories.updateById);



// [DELETE]
router.delete('/', controllerCategories.deleteById);





module.exports = router;

