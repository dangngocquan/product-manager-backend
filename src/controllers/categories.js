const serviceCategories = require('../services/categories');
const auth = require('../services/auth');
const role = require('../services/role');



// [GET]

async function getByPage(req, res, next) {
    try {
        var categories = await serviceCategories.getCategoriesByPage(req.params.page);
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": `Get categories page ${req.params.page} successfully.`,
            "categories": categories
        }));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": `Get categories page ${req.params.page} failed.`
        }));
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        var categories = await serviceCategories.getCategoryById(req.params.id);
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": `Get category id ${req.params.id} successfully.`,
            "categories": categories
        }));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": `Get category id ${req.params.id} failed.`
        }));
        next(err);
    }
}

async function getByLevel(req, res, next) {
    try {
        var categories = await serviceCategories.getCategoriesByLevel(req.params.level);
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": `Get category level ${req.params.level} successfully.`,
            "categories": categories
        }));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": `Get category level ${req.params.level} failed.`
        }));
        next(err);
    }
}

async function getChildren(req, res, next) {
    try {
        var categories = await serviceCategories.getChildrenOfCategoryById(req.params.id);
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": `Get children of category has id ${req.params.id} successfully.`,
            "children": categories
        }));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": `Get children of category has id ${req.params.id} failed.`
        }));
        next(err);
    }
}

async function getTree(req, res, next) {
    try {
        var categories = await serviceCategories.getCategoriesTree();
        res.type('json');
        res.send(JSON.stringify({
            "status": 1,
            "message": `Get category tree successfully.`,
            "categories": categories
        }));
    } catch (err) {
        console.error("Error while getting categories. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": `Get category tree failed.`
        }));
        next(err);
    }
}





// [POST]
async function createNew(req, res, next) {
    try {
        res.type('json');
        if (await role.isAdmin(req.body.token)) {
            await serviceCategories.createNewCategory(req.body.data);
            res.send(JSON.stringify({
                "status": 1,
                "message": "Insert new categories successfully."
            }));
        } else {
            res.send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only admin can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while inserting new categories. ",  err.message);
        res.type('json');
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
        res.type('json');
        if (await role.isAdmin(req.body.token)) {
            await serviceCategories.updateCategoryById(req.body.id, req.body.newData);
            res.send(JSON.stringify({
                "status": 1,
                "message": "Update categories successfully."
            }));
        } else {
            res.send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only admin can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while updating new categories. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Update new categories failed."
        }));
        next(err);
    }
}





// [DELETE]
async function deleteById(req, res, next) {
    try {
        res.type('json');
        if (await role.isAdmin(req.body.token)) {
            await serviceCategories.deleteCategoryById(req.body.id);
            res.send(JSON.stringify({
                "status": 1,
                "message": "Delete category successfully."
            }));
        } else {
            res.send(JSON.stringify({
                "status": 0,
                "message": "Authentication denied! Only admin can do this action."
            }));
        }
    } catch (err) {
        console.error("Error while deleting category. ",  err.message);
        res.type('json');
        res.send(JSON.stringify({
            "status": 0,
            "message": "Delete category failed."
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
    updateById: updateById,
    //[DELETE]
    deleteById: deleteById
}