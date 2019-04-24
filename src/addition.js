const additions = require('../../juglans-addition')
const config = require('./config')

const mongoose = additions.mongoose
const Redis = additions.Redis
const logger = additions.logger
const repo = module.exports

repo.logger = logger.createLogger(config)
repo.redis = Redis.retryConnect(config.redis.uri, config.redis.opts, function (err) {
  if (err) {
    console.log(`Redis:${config.redis.uri} connect failed!`)
    console.error(err)
  } else {
    console.log(`Redis:${config.redis.uri} connect successfully!`)
  }
})

repo.mongoose = mongoose.retryConnect(config.mongo.uri, config.mongo.opts, function (err) {
  if (err) {
    console.log(`Mongodb:${config.mongo.uri} connect failed!`)
    console.error(err)
  } else {
    console.log(`Mongodb:${config.mongo.uri} connect successfully!`)
  }
})
