const taskRepository = require('../models/tasksModels')

async function add(task) {
    try {
        const response = await taskRepository.toAdd(task)

        if (!response.success) throw new Error('Erro ao adicionar task')
    } catch (error) {
        throw error
    }
}

async function fetchAll(page, limit) {
    try {
        const offset = (page - 1) * limit

        const response = await taskRepository.listAll(limit, offset)

        return {
            founds: response.founds,
            totalPages: response.totalPages
        }
    } catch (error) {
        throw error
    }
}

async function get(taskId) {
    try {
        const response = await taskRepository.getTask(taskId)

        return {
            data: response
        }
    } catch (error) {
        throw error
    }
}

async function change(taskChanges) {
    try {
        const response = await taskRepository.toChange(taskChanges)

        if (!response.success) throw new Error('Erro ao deletar task')
    } catch (error) {
        throw error
    }
}

async function status(taskId) {
    try {
        const response = await taskRepository.toStatus(taskId)

        if (!response.success) throw new Error('Erro ao alterar status da task')
    } catch (error) {
        throw error
    }
}

async function discard(taskId) {
    try {
        const response = await taskRepository.toDelete(taskId)

        if (!response.success) throw new Error('Erro ao deletar task')
    } catch (error) {
        throw error
    }
}



module.exports = {
    add,
    fetchAll,
    get,
    change,
    status,
    discard
}