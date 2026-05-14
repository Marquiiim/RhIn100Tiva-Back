const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const rateLimiter = require('./middlewares/rateLimiter')

const app = express()

const allowedOrigins = [
    //PÚBLICO
    'https://rh-in100-tiva-front.vercel.app?_vercel_share=iYHMw8vxfkm3pn6XjvzDEMovcw1VTkti',

    //PRIVADO
    'https://rh-in100-tiva-front-j0joo3s5z-marquiiims-projects.vercel.app'
]

app.use(cors({
    origin: 'https://rh-in100-tiva-front.vercel.app?_vercel_share=iYHMw8vxfkm3pn6XjvzDEMovcw1VTkti'
}))

app.use(express.json())

app.use(rateLimiter)

app.use('/api', routes)

module.exports = app
