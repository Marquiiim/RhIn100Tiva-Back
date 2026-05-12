const z = require('zod')
const tasksSchema = require('../schemas/tasks.schemas')

async function taskValidate(req, res, next) {
    try {
        const { task } = req.body

        tasksSchema.toAdd.parse(task)
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
    taskValidate
}