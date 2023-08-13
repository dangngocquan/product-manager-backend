const categoriesModel = require('../models/categories');
const helper = require('../utils/helper');
const general = require('../configs/general');
const {Op} = require('sequelize');  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

async function getCategoriesByPage(page = 1) {
    var rows = await categoriesModel.findAll({
        offset: helper.getOffset(page, general.listPerPage),
        limit: general.listPerPage,
    });

    var categories = helper.emptyOrRows(rows);

    return {
        categories
    };
}

async function getCategoriesByLevel(level = 1) {
    var rows = await categoriesModel.findAll({
        offset: helper.getOffset(page, general.listPerPage),
        limit: general.listPerPage,
    });

    var categories = helper.emptyOrRows(rows);

    return {
        categories
    };
}


module.exports = {
    getCategoriesByPage: getCategoriesByPage,
}

