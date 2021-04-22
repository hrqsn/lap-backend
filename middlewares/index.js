const { Router } = require('express')
const middlewares = Router()

const helmet = require('helmet')
middlewares.use(helmet())

const bodyParser = require('body-parser')
middlewares.use(bodyParser.json({ extended: true }))

const cors = require('./cors')
middlewares.use(cors)

module.exports = middlewares
