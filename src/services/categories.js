const db = require('./db');
const general = require('../configs/general');
const helper = require('../utils/helper');

async function getCategoriesByPage(page = 1) {
    const limit = general.listPerPage;
    const offset = helper.getOffset(page, general.listPerPage);
    const sql = `SELECT * FROM categories LIMIT ${limit} OFFSET ${offset}`;
    const rows = await db.query(sql);

    return {
        categories: categories
    }
}

module.exports = {
    getCategoriesByPage: getCategoriesByPage
}