const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

// GET categories 
router.get('/', categoriesController.get);

module.exports = router;