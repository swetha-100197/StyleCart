const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "stylecart_db",
    password: "swetha1005",
    port: 5432
});

module.exports = pool;