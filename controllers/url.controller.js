const shortid = require('shortid')
const { Url } = require('../models/url.model.js')

const genarateNewShortUrl = async (req, res) => {
  try {
    const body = req.body
    console.log(body.url)
    if (!body.url) {
      return res.status(400).json({
        error: 'url is required',
      })
    }
    const newshortid = shortid()
    await Url.create({
      shortId: newshortid,
      redirectUrl: body.url,
      visitHistory: [],
    })
    return res.json({
      id: newshortid,
    })
  } catch (error) {
    return res.json({
      error,
    })
  }
}
const getAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId
    const analytics = await Url.findOne({ shortId })
    // console.log(analytics)
    return res.status(200).json({
      totalClicks: analytics.visitHistory.length,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'server error',
    })
  }
}

module.exports = {
  genarateNewShortUrl,
  getAnalytics,
}
