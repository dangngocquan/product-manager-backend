const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

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


module.exports = {
    getCategoriesByPage: getCategoriesByPage,
    getCategoriesById: getCategoriesById,
    getCategoriesByLevel: getCategoriesByLevel,
    getCategoriesChildren: getCategoriesChildren
}