const z = require('zod')
const tasksSchema = require('../schemas/tasks.schemas')

async function validateTask(req, res, next) {
    try {
        const { name, description } = req.body.task
        const task = { name, description }

        tasksSchema.taskValidateSchema.parse(task)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message,
                details: error.issues
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Erro interno na validação'
        })
    }
}

async function validateTaskId(req, res, next) {
    try {
        const id = req.query.id ?? req.body.id

        tasksSchema.idSchema.parse(id)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message,
                details: error.issues
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Erro interno na validação'
        })
    }
}

module.exports = {
    validateTask,
    validateTaskId
}