const Sequelize = require('sequelize');
const db = require('../services/db');

const categories = db.define(
    "categories",
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.TEXT
        },
        level: {
            type: Sequelize.INTEGER
        },
        parent_category_id: {
            type: Sequelize.BIGINT
        },
        time_added: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM,
            values: ["normal", "hidden", "deleted"]
        }
    },
    {
        // This is to ensure that Sequelize
        // does not pluralize table names
        freezeTableName: true,
        // This is to ensure that Sequelize
        // does not add its own timestamp
        // variables in the query.
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = categories;