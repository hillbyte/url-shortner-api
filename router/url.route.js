const express = require('express')
const {
  genarateNewShortUrl,
  getAnalytics,
} = require('../controllers/url.controller.js')
const router = express.Router()

router.post('/', genarateNewShortUrl)
router.get('/analytics/:shortId', getAnalytics)

module.exports = router
