const taskServices = require('../services/taskServices')

async function createTask(req, res, next) {
    try {
        const { task } = req.body

        await taskServices.add(task)

        return res.status(200).json({
            success: true,
            message: 'Task criada com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

async function fetchAllTasks(req, res) {
    try {
        const { page, limit } = req.query

        const foundTasks = await taskServices.fetchAll(page, limit)

        return res.status(200).json({
            success: true,
            found: foundTasks.founds,
            totalPages: foundTasks.totalPages
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

async function getTask(req, res) {
    try {
        const { id } = req.query

        const response = await taskServices.get(id)

        return res.status(200).json({
            success: true,
            task: response.data
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function changeTask(req, res) {
    try {
        const { id, name, description } = req.body.task
        const task = { id, name, description }

        await taskServices.change(task)

        return res.status(200).json({
            success: true,
            message: 'Alteração salva com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function statusTask(req, res) {
    try {
        const { id } = req.body

        await taskServices.status(id)

        return res.status(200).json({
            success: true,
            message: 'Status da task alterado com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.query

        await taskServices.discard(id)

        return res.status(200).json({
            success: true,
            message: 'Task deletada com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    getTask,
    changeTask,
    statusTask,
    deleteTask
}