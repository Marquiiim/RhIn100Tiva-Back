const { query } = require('../config/connectionDB')

const tasks = {

    toAdd: async (data) => {
        const alreadyExist = await query(
            `SELECT name
            FROM tasks 
            WHERE name = ?`, [data]
        )

        if (alreadyExist.length > 0) throw new Error('Essa task já existe na sua lista')

        const create = await query(
            `INSERT INTO tasks (name)
            VALUES (?)`, [data]
        )

        if (create.affectedRows === 0) throw new Error('Não foi possível criar task')

        return {
            success: true
        }
    },

    listAll: async (limit, offset) => {
        const allFoundTasks = await query(
            `SELECT * FROM tasks
            ORDER BY createdAt DESC
            LIMIT ? OFFSET ?`, [limit, offset]
        )

        const totalPages = await query(
            `SELECT COUNT(*) as totalPages FROM tasks`
        )

        if (allFoundTasks === 0) throw new Error('Nenhuma tarefa encontrada')

        return {
            founds: allFoundTasks,
            totalPages: totalPages[0]
        }
    }
}

module.exports = tasks