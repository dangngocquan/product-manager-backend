const Sequelize = require('sequelize');

const dbconfig = new Sequelize(
    {
        dialect: "mysql",
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "nkw1k42k3",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || "product_manager",
        logging: (log) => console.log("logging:", log)
    }
)

module.exports = dbconfig;