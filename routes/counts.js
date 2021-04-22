const router = require('express').Router()
const { getCount, updateCount, subscription } = require('../controllers/counts')

router.post('/new', (req, res) => {
  subscription(req, res)
})

router.get('/counts/:uid', (req, res) => {
  getCount(req, res)
})

router.put('/counts/:uid', (req, res, next) => {
  updateCount(req, res, next)
})

module.exports = router
