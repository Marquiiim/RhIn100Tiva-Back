const express = require('express')
const tasks = require('./tasksRoutes')

const router = express.Router()

router.use('/task', tasks)

module.exports = router