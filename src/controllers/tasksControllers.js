const taskServices = require('../services/taskServices')

async function taskCreate(req, res, next) {
    try {
        const { task } = req.body

        const response = await taskServices.addTask(task)

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
            found: foundTasks
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

module.exports = {
    taskCreate,
    fetchAllTasks
}