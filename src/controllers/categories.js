const categoriesServices = require('../services/categories');

async function get(req, res, next) {
    try {
        res.json(await categoriesServices.getCategories(req.query.page));
    } catch (err) {
        console.error(`Error while getting categories`, err.message);
        next(err);
    }
}

module.exports = {
    get
}