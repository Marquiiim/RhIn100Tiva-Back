const { query } = require('../config/connectionDB')

const tasks = {

    toAdd: async (task) => {
        const alreadyExist = await query(
            `SELECT name
            FROM tasks 
            WHERE name = ?`, [task.name]
        )

        if (alreadyExist.length > 0) throw new Error('Essa task já existe na sua lista')

        const create = await query(
            `INSERT INTO tasks (name, description)
            VALUES (?, ?)`, [task.name, task.description]
        )

        if (create.affectedRows === 0) throw new Error('Não foi possível criar task')

        return {
            success: true
        }
    },

    listAll: async (limit, offset) => {
        const safeLimit = Number(limit);
        const safeOffset = Number(offset)

        const allFoundTasks = await query(
            `SELECT * FROM tasks
             ORDER BY createdAt DESC 
             LIMIT ${safeLimit} OFFSET ${safeOffset}`
        )

        if (allFoundTasks.length === 0) throw new Error('Nenhuma tarefa encontrada')

        const result = await query(
            `SELECT COUNT(*) as total FROM tasks`
        )

        const totalPages = Math.ceil(result[0].total / safeLimit)

        return {
            founds: allFoundTasks,
            totalPages: totalPages
        }
    },

    getTask: async (taskId) => {
        const dataTask = await query(
            `SELECT * FROM tasks
            WHERE id = ?`, [taskId]
        )

        if (!dataTask[0]) throw new Error('Não foi possível coletar informações sobre a task')

        return dataTask[0]
    },

    toChange: async (taskChanges) => {
        const { id, name, description } = taskChanges

        const taskInDB = await query(
            `SELECT name, description 
            FROM tasks
            WHERE id = ?`, [id]
        )

        if (taskInDB[0].name === name && taskInDB[0].description === description) throw new Error('Altere pelo menos um dos dados para alterar')

        const change = await query(
            `UPDATE tasks
            SET name = ?,
            description = ?
            WHERE id = ?`, [name, description, id]
        )

        return {
            success: true
        }
    },

    toStatus: async (taskId) => {
        const alreadyExist = await query(
            `SELECT * FROM tasks
            WHERE id = ?
            LIMIT 1`, [taskId]
        )

        if (alreadyExist.length === 0) throw new Error('Task não existente no servidor')

        const newStatus = alreadyExist[0].isComplete ? 0 : 1

        const toggleStatus = await query(
            `UPDATE tasks
            SET isComplete = ?,
            completedAt = IF(? = 1, NOW(), NULL)
            WHERE id = ?`, [newStatus, newStatus, taskId]
        )

        return {
            success: true
        }
    },

    toDelete: async (taskId) => {
        const alreadyExist = await query(
            `SELECT * FROM tasks
            WHERE id = ?
            LIMIT 1`, [taskId]
        )

        if (alreadyExist.length === 0) throw new Error('Task não existente no servidor')

        const discard = await query(
            `DELETE FROM tasks
            WHERE id = ?`, [taskId]
        )

        if (discard.affectedRows === 0) throw new Error('Não foi possível deletar task')

        return {
            success: true
        }
    }
}

module.exports = tasks