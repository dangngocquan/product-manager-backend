const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]

async function getCategoriesByPage(page = 1) {
    const limit = general.listPerPage;
    const offset = helper.getOffset(page, general.listPerPage);
    const sql = 
        `SELECT * FROM categories ` + 
        `WHERE status = \"normal\" ` + 
        `LIMIT ${limit} OFFSET ${offset}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoryById(id = 1) {
    const sql = 
        `SELECT * FROM categories ` + 
        `WHERE status = \"normal\" AND id = ${id}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoriesByLevel(level = 1) {
    const sql = 
        `SELECT * FROM categories ` + 
        `WHERE status = \"normal\" AND level = ${level}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getChildrenOfCategoryById(id = 1) {
    const sql = 
        `SELECT * FROM categories ` + 
        `WHERE status = \"normal\" AND parent_category_id = ${id}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategories() {
    const sql = 
        `SELECT * FROM categories ` + 
        `WHERE status = \"normal\"`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoriesTree() {
    var categories = (await getCategories()).categories;
    var tree = [];
    categories.forEach(function(category) {
        if (category.level == 1) tree.push(category);
        category.children = [];
        categories.forEach(function(child) {
            if (child.parent_category_id == category.id) category.children.push(child);
        })
    })

    return {
        categories: tree
    }
}





// [POST]

async function createNewCategory(formData) {
    var sql = 
        `INSERT INTO categories (name, image, level, parent_category_id) ` + 
        `VALUE (\"${formData.name}\", \"${formData.image}\", ${formData.level}, ${formData.parent_category_id})`;

    await db.query(sql);
}





// [PATCH]
async function updateCategoryById(id = 0, formData = {}) {
    var newData = [];
    for (var key in formData) {
        if (typeof formData[key] === 'string') {
            newData.push(key + " = \"" + formData[key] + "\"");
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
    `UPDATE categories` + 
    `SET status=\"deleted\"` +
    `WHERE id = ${id}`;
    await db.query(sql); 
}


module.exports = {
    // [GET]
    getCategoriesByPage: getCategoriesByPage,
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