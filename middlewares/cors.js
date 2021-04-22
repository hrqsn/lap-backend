const cors = require('cors')

const corsOptions = {
  origin: true,
  credentials: true,
  allowedHeaders: 'Content-Type, Origin, Authorization, X-Requested-With',
  optionsSuccessStatus: 200
}

module.exports = cors(corsOptions)
