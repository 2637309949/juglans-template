// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const winston = require('winston')
const path = require('path')
const additions = require('../../juglans-addition')
const config = require('./config')

const Redis = additions.Redis
const seq = additions.seq
const mgo = additions.mgo

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
repo.mongoose = mgo.mongoose
repo.mgoExt = mgo.Ext.Connect(config.mongo.uri, config.mongo.opts)

// sequelize init
repo.Sequelize = seq.Sequelize
repo.SeqExt = seq.Ext.Connect(config.sql.uri, config.sql.opts)
