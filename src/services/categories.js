const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

// [GET]

async function getCategoriesByPage(page = 1) {
    const limit = general.listPerPage;
    const offset = helper.getOffset(page, general.listPerPage);
    const sql = `SELECT * FROM categories LIMIT ${limit} OFFSET ${offset}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoriesById(id = 1) {
    const sql = `SELECT * FROM categories WHERE id = ${id}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoriesByLevel(level = 1) {
    const sql = `SELECT * FROM categories WHERE level = ${level}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategoriesChildren(id = 1) {
    const sql = `SELECT * FROM categories WHERE parent_category_id = ${id}`;
    const rows = await db.query(sql);

    return {
        categories: rows
    }
}

async function getCategories() {
    const sql = `SELECT * FROM categories`;
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
async function createNewCategories(formData) {
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


module.exports = {
    // [GET]
    getCategoriesByPage: getCategoriesByPage,
    getCategoriesById: getCategoriesById,
    getCategoriesByLevel: getCategoriesByLevel,
    getCategoriesChildren: getCategoriesChildren,
    getCategoriesTree: getCategoriesTree,
    // [POST]
    createNewCategories: createNewCategories,
    // [PATCH]
    updateCategoryById: updateCategoryById
}