const express = require('express')

const tasksMiddlewares = require('../middlewares/tasksMiddlewares')
const tasksControllers = require('../controllers/tasksControllers')

const router = express.Router()

router.post('/add', tasksMiddlewares.validateTask, tasksControllers.createTask)
router.get('/all', tasksControllers.fetchAllTasks)
router.get('/get', tasksMiddlewares.validateTaskId, tasksControllers.getTask)
router.patch('/change', tasksMiddlewares.validateTask, tasksControllers.changeTask)
router.patch('/change/status', tasksMiddlewares.validateTaskId, tasksControllers.statusTask)
router.delete('/delete', tasksMiddlewares.validateTaskId, tasksControllers.deleteTask)

module.exports = router