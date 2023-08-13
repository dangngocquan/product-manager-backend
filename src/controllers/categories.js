const categoriesServices = require('../services/categories');

async function get(red, res, next) {
    try {
        res.json(categoriesServices.getCategories(1));
    } catch (err) {
        console.error(`Error while getting categories`, err.message);
        next(err);
    }
}