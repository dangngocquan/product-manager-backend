const categoriesModel = require('../models/categories');
const helper = require('../utils/helper');
const general = require('../configs/general');

async function getCategories(page = 1) {
    var rows = categoriesModel.findAllAndCount({
        offset: helper.getOffset(page, general.listPerPage),
        limit: general.listPerPage
    })

    var categories = helper.emptyOrRows(rows);

    return categories;
}


module.exports = {
    getCategories
}

