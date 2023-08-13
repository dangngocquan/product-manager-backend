const serviceCategories = require('../services/categories');

async function getByPage(req, res, next) {
    try {
        res.json(await serviceCategories.getCategoriesByPage(req.params.page));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        res.json(await serviceCategories.getCategoriesById(req.params.id));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        next(err);
    }
}

async function getByLevel(req, res, next) {
    try {
        res.json(await serviceCategories.getCategoriesByLevel(req.params.level));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        next(err);
    }
}

async function getChildren(req, res, next) {
    try {
        res.json(await serviceCategories.getCategoriesChildren(req.params.id));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        next(err);
    }
}


module.exports = {
    getByPage: getByPage,
    getById: getById,
    getByLevel: getByLevel,
    getChildren: getChildren
}