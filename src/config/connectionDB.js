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
    queueLimit: 0
})

const query = (sql, params = []) => {
    if (!params) params = [];
    if (!Array.isArray(params)) params = [params];

    console.log('=== QUERY DEBUG ===');
    console.log('SQL:', sql);
    console.log('Params:', params);
    console.log('Quantidade de placeholders (?):', (sql.match(/\?/g) || []).length);
    console.log('Quantidade de params:', params.length);

    return new Promise((resolve, reject) => {
        pool.execute(sql, params, (error, results) => {
            if (error) {
                console.error('ERRO NA QUERY:', error.message);
                reject(error);
            } else {
                console.log('SUCESSO:', results.length || results.affectedRows);
                resolve(results);
            }
        })
    })
}

const testConnection = async () => {
    try {
        const result = await query('SELECT 1 as test');
        console.log('Conexão com banco OK!');
        return true;
    } catch (error) {
        console.error('Erro na conexão:', error.message);
        return false;
    }
}

testConnection();

module.exports = {
    pool,
    query,
    testConnection
}