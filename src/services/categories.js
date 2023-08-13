const categoriesModel = require('../models/categories');
const helper = require('../utils/helper');
const general = require('../configs/general');

var rows = categoriesModel.findAllAndCount({
    offset: helper.getOffset(1, general.listPerPage),
    limit: general.listPerPage
})

var categories = helper.emptyOrRows(rows);

module.exports = {
    categories
}

