const express = require('express')

const tasksMiddlewares = require('../middlewares/tasksMiddlewares')
const tasksControllers = require('../controllers/tasksControllers')

const router = express.Router()

router.post('/add', tasksMiddlewares.taskValidate, tasksControllers.taskCreate)
router.get('/all', tasksControllers.fetchAllTasks)
/*router.get('/', )
router.patch('/', )
router.patch('/', )
router.delete('/', )*/

module.exports = router