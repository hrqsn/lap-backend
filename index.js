const express = require('express')
const router = require('./routes')
const middlewares = require('./middlewares')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

const PORT = process.env.PORT || 8008
const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', true)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
}))

app.use(middlewares)
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}.`)
})

module.exports = app
