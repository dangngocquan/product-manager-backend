const { get } = require('../routes/categories');
const serviceCategories = require('../services/categories');


// [GET]

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

async function getTree(req, res, next) {
    try {
        res.json(await serviceCategories.getCategoriesTree());
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        next(err);
    }
}


// [POST]
async function createNew(req, res, next) {
    try {
        await serviceCategories.createNewCategories(req.body);
        res.send(JSON.stringify({
            "status": 1,
            "message": "Insert new categories successfully."
        }));
    } catch (err) {
        console.error("Error while inserting new categories. ",  err.message);
        res.send(JSON.stringify({
            "status": 0,
            "message": "Insert new categories failed."
        }));
        next(err);
    }
}




// [PATCH]
async function updateById(req, res, next) {
    try {
        await serviceCategories.updateCategoryById(req.params.id, req.body);
        res.send(JSON.stringify({
            "status": 1,
            "message": "Update categories successfully."
        }));
    } catch (err) {
        console.error("Error while updating new categories. ",  err.message);
        res.send(JSON.stringify({
            "status": 0,
            "message": "Update new categories failed."
        }));
        next(err);
    }
}


module.exports = {
    // [GET]
    getByPage: getByPage,
    getById: getById,
    getByLevel: getByLevel,
    getChildren: getChildren,
    getTree: getTree,
    // [POST]
    createNew: createNew,
    // [PATCH]
    updateById: updateById
}