const mongoose = require('../juglans').mongoose
const config = require('../config')

module.exports = mongoose.retryConnect(config.mongo.uri, config.mongo.opts, function (err) {
  mongoose.set('useCreateIndex', true)
  if (err) {
    console.log(`Mongodb:${config.mongo.uri} connect failed!`)
    console.error(err)
  } else {
    console.log(`Mongodb:${config.mongo.uri} connect successfully!`)
  }
})
