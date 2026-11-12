require("dotenv").config();

const { Pool } = require("pg");

let pool;

if (process.env.DB_MODE === "neon") {

    pool = new Pool({
        connectionString:
            process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

} else {

    pool = new Pool({
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "stylecart_db",
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || 5432
    });

}

module.exports = pool;