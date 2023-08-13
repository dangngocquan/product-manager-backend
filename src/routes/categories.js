const express = require('express');
const router = express.Router();
const controllerCategories = require('../controllers/categories');




router.get('/page/:page', controllerCategories.getByPage);
router.get('/id/:id', controllerCategories.getById);
router.get('/level/:level', controllerCategories.getByLevel);
router.get('/:id/children', controllerCategories.getChildren);

module.exports = router;

