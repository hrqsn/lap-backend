const isProduction = process.env.NODE_ENV === 'production'

const SERVER_BASE_URL = isProduction ? 'https://api.lap.halsakuragi.com' : 'http://127.0.0.1:8008'

module.exports = {
  SERVER_BASE_URL
}
