/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [全局引用类]
 */
const winston = require('winston')
const path = require('path')
const additions = require('../../juglans-addition')
const config = require('./config')

const mongoose = additions.mongoose
const Redis = additions.Redis
const repo = module.exports

const { combine, timestamp, printf, colorize } = winston.format

const format = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp }) => {
    return `[${level}]: ${timestamp} ${message}`
  })
)

// logger init
repo.logger = winston.createLogger({
  level: 'info',
  format,
  defaultMeta: { service: config.logger.service },
  transports: [
    new winston.transports.File({ filename: path.join(config.logger.path, 'error.log'), level: 'error', maxsize: config.logger.maxsize }),
    new winston.transports.File({ filename: path.join(config.logger.path, 'combined.log'), maxsize: config.logger.maxsize }),
    new winston.transports.Console({ format })
  ]
})

// redis init
repo.redis = Redis.retryConnect(config.redis.uri, config.redis.opts, function (err) {
  if (err) {
    repo.logger.info(`Redis:${config.redis.uri} connect failed!`)
    repo.logger.error(err)
  } else {
    repo.logger.info(`Redis:${config.redis.uri} connect successfully!`)
  }
})

// mongoose init
repo.mongoose = mongoose.retryConnect(config.mongo.uri, config.mongo.opts, function (err) {
  if (err) {
    repo.logger.info(`Mongodb:${config.mongo.uri} connect failed!`)
    repo.logger.error(err)
  } else {
    repo.logger.info(`Mongodb:${config.mongo.uri} connect successfully!`)
  }
})
