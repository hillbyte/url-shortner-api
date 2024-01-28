const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    require: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    require: true,
  },
  visitHistory: [
    {
      timestamps: {
        type: Number,
      },
    },
  ],
})

// create URL model
const Url = mongoose.model('Url', urlSchema)

module.exports = {
  Url,
}
