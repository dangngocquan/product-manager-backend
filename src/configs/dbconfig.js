const dotenv = require("dotenv");
dotenv.config();
 

const dbconfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
}

module.exports = dbconfig;