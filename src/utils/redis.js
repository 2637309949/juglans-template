const Redis = require('../juglans').Redis
const config = require('../config')

module.exports = Redis.retryConnect(config.redis.uri, config.redis.opts, function (err) {
  if (err) {
    console.log(`Redis:${config.redis.uri} connect failed!`)
    console.error(err)
  } else {
    console.log(`Redis:${config.redis.uri} connect successfully!`)
  }
})