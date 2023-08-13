const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

// GET categories 
router.use('/', categoriesController.getByPage);

module.exports = router;