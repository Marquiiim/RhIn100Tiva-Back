const taskRepository = require('../models/tasksModels')

async function addTask(data) {
    try {
        const response = await taskRepository.toAdd(data)

        if (!response.success) throw new Error('Erro ao adicionar task')
    } catch (error) {
        throw error
    }
}

async function fetchAll(page, limit) {
    try {
        const offset = (page - 1) * limit

        const response = await taskRepository.listAll(limit, offset)

        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    addTask,
    fetchAll
}