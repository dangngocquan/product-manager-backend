const categoriesModel = require('../models/categories');
const helper = require('../utils/helper');
const general = require('../configs/general');

async function getCategories(page = 1) {
    var rows = await categoriesModel.findAll({
        offset: 0,
        limit: 5
    });

    var categories = helper.emptyOrRows(rows);

    return {
        categories
    };
}


module.exports = {
    getCategories
}

