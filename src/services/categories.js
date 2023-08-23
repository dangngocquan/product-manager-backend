const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]

async function getCategoryById(id = 1) {
    const sql = 
        `SELECT id, name, image, level, parent_category_id, EXTRACT(EPOCH FROM time_added) AS time_added, status ` + 
        `FROM categories ` + 
        `WHERE status = \'normal\' AND id = ${id}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoriesByLevel(level = 1, page = 0) {
    

    var sql = 
        `SELECT id, name, image, level, parent_category_id, EXTRACT(EPOCH FROM time_added) AS time_added, status ` + 
        `FROM categories ` + 
        `WHERE status = \'normal\' AND level = ${level} `;
    if (page > 0) {
        const limit = general.listPerPage;
        const offset = helper.getOffset(page, general.listPerPage);
        sql += `LIMIT ${limit} OFFSET ${offset}`
    }
        
    const rows = await db.query(sql);

    var sqlCountPages = 
        `SELECT COUNT(*) FROM categories ` + 
        `WHERE status = \'normal\' AND level = ${level}`;
    const countPages = Math.ceil(
        (await db.query(sqlCountPages))[0].count / general.listPerPage);

    return {
        countPages: countPages,
        categories: rows
    }
}

async function getChildrenOfCategoryById(id = 0, page = 0) {
    var sql = 
        `SELECT id, name, image, level, parent_category_id, EXTRACT(EPOCH FROM time_added) AS time_added, status ` + 
        `FROM categories ` + 
        `WHERE status = \'normal\' AND parent_category_id = ${id} `;

    if (page > 0) {
        const limit = general.listPerPage;
        const offset = helper.getOffset(page, general.listPerPage);
        sql += `LIMIT ${limit} OFFSET ${offset}`
    } 

    const rows = await db.query(sql);

    var sqlCountPages = 
        `SELECT COUNT(*) ` + 
        `FROM categories ` + 
        `WHERE status = \'normal\' AND parent_category_id = ${id}`;
    const countPages = Math.ceil(
        (await db.query(sqlCountPages))[0].count / general.listPerPage);

    return {
        countPages: countPages,
        categories: rows
    }
}

async function getCategories(page = 0) {
    var sql = 
        `SELECT id, name, image, level, parent_category_id, EXTRACT(EPOCH FROM time_added) AS time_added, status ` + 
        `FROM categories ` + 
        `WHERE status = \'normal\' `;
    if (page > 0) {
        const limit = general.listPerPage;
        const offset = helper.getOffset(page, general.listPerPage);
        sql += `LIMIT ${limit} OFFSET ${offset}`
    } 
    const rows = await db.query(sql);

    var sqlCountPages = 
        `SELECT COUNT(*) ` + 
        `FROM categories ` + 
        `WHERE status = \'normal\' `;
    const countPages = Math.ceil(
        (await db.query(sqlCountPages))[0].count / general.listPerPage);

    return {
        countPages: countPages,
        categories: rows
    }
}

async function getCategoriesTree(rootCategoryId = 0) {
    var categories = (await getCategories()).categories;

    var tree = [];
    categories.forEach(function(category) {
        if ((rootCategoryId == 0 && category.level == 1) || 
            (rootCategoryId > 0 && category.id == rootCategoryId)) {
                tree.push(category);
        }
        category.children = [];
        categories.forEach(function(child) {
            if (child.parent_category_id == category.id) category.children.push(child);
        })
    })

    var cloneTree = JSON.parse(JSON.stringify(tree))
    var array = [];
    while (cloneTree.length > 0) {
        var arr = [];
        cloneTree.forEach((category) => {
            array.push(category);
            arr = [...arr, ...category.children];
        })
        cloneTree = JSON.parse(JSON.stringify(arr));
    }
    array.forEach((category) => {
        delete category.children;
    })



    return {
        categoriesTree: tree,
        categoriesArray: array
    }
}





// [POST]

async function createNewCategory(formData) {
    var sql = 
        `INSERT INTO categories (name, image, level, parent_category_id) ` + 
        `VALUES (\'${formData.name}\', \'${formData.image}\', ${formData.level}, ${formData.parent_category_id})`;

    await db.query(sql);
}





// [PATCH]
async function updateCategoryById(id = 0, formData = {}) {
    var newData = [];
    for (var key in formData) {
        if (typeof formData[key] === 'string') {
            newData.push(key + " = \'" + formData[key] + "\'");
        } else if (typeof formData[key] === 'number') {
            newData.push(key + " = " + formData[key]);
        }
    }
    newData = newData.join(", ");
    var sql = 
        `UPDATE categories ` + 
        `SET ${newData} ` +
        `WHERE id = ${id}`;
    await db.query(sql); 
}





// [DELETE]
async function deleteCategoryById(id = 0) {
    var sql = 
        `UPDATE categories ` + 
        `SET status = \'deleted\' ` +
        `WHERE id = ${id}`;
    await db.query(sql); 
}


module.exports = {
    // [GET]
    getCategoryById: getCategoryById,
    getCategoriesByLevel: getCategoriesByLevel,
    getChildrenOfCategoryById: getChildrenOfCategoryById,
    getCategoriesTree: getCategoriesTree,
    // [POST]
    createNewCategory: createNewCategory,
    // [PATCH]
    updateCategoryById: updateCategoryById,
    // [DELETE]
    deleteCategoryById: deleteCategoryById
}