const express = require('express');
const router = express.Router();
const controllerCategories = require('../controllers/categories');

router.use('/', controllerCategories.getByPage);

module.exports = router;

