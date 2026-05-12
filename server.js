const dotenv = require('dotenv')
const app = require('./src/app')
const { pool } = require('./src/config/connectionDB')

const PORT = process.env.PORT

dotenv.config()

pool.getConnection((err, connection) => {
    if (err) {
        console.error('[ERRO] Erro ao conectar ao banco de dados', err)
        process.exit(1)
    }
    console.log('[SUCESSO] Conexão com banco de dados estabelecida')
})

app.listen(PORT, () => {
    console.log(`[SUCESSO] Servidor rodando em: http://localhost:${PORT}`)
    console.log(`[SUCESSO] Banco de dados: ${process.env.DB_NAME}, ${process.env.DB_HOST}, ${process.env.DB_PORT}`)
})