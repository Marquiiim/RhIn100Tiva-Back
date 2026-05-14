const dotenv = require('dotenv')
const mysql = require('mysql2')

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

const query = (sql, params) => {
    if (!params) params = [];
    if (!Array.isArray(params)) params = [params];

    const formattedParams = params.map(p => {
        if (typeof p === 'string' && !isNaN(p) && p.trim() !== '') {
            return Number(p);
        }
        return p;
    });

    return new Promise((resolve, reject) => {
        pool.execute(sql, formattedParams, (error, results) => {
            if (error) reject(error)
            else resolve(results)
        })
    })
}

module.exports = {
    pool,
    query
}