// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const path = require('path')
const fetch = require('node-fetch')
const config = require('./config')
const additions = require('../../juglans-addition')

const logger = additions.logger
const winston = logger.winston
const redis = additions.redis
const seq = additions.seq
const mgo = additions.mgo
const i18n = additions.i18n
const apidoc = additions.apidoc

const repo = module.exports

// logger init
repo.logger = logger
  .add(new winston.transports.File({ filename: path.join(config.logger.path, 'error.log'), level: 'error', maxsize: config.logger.maxsize }))
  .add(new winston.transports.File({ filename: path.join(config.logger.path, 'combined.log'), maxsize: config.logger.maxsize }))

// redis init
repo.Redis = redis.Redis
repo.redis = redis.Connect(config.redis.uri, config.redis.opts, function (err) {
  if (err) {
    repo.logger.info(`Redis:${config.redis.uri} connect failed!`)
    repo.logger.error(err.stack || err.message)
  } else {
    repo.logger.info(`Redis:${config.redis.uri} connect successfully!`)
  }
})

// mongoose init
repo.mongoose = mgo.mongoose
repo.mgoExt = mgo.Ext.Connect(config.mongo.uri, config.mongo.opts)
repo.mgoExt.setApiOpts({
  prefix: '/template/mgo'
})

// sequelize init
repo.Sequelize = seq.Sequelize
repo.SeqExt = seq.Ext.Connect(config.sql.uri, config.sql.opts)
// for dev, drop and create table
repo.SeqExt.sequelize.sync({ force: true }).then(async () => {
  const User = repo.SeqExt.Model('user')
  await User.findOrCreate({
    where: { id: '1' },
    defaults: {
      id: 1,
      name: 'root',
      password: '111111',
      _creator: 1,
      _updator: 1
    }
  })
})
// for dev, drop and create table end
repo.SeqExt.setApiOpts({
  prefix: '/template/seq'
})

// apidoc init
repo.apidoc = apidoc({ prefix: '/docs', mgoExt: repo.mgoExt, seqExt: repo.SeqExt })
repo.apidoc.doc(path.join(__dirname, '../doc'))

// i18n init
repo.I18N = i18n({
  prefix: '/i18n',
  async ctxLocale (ctx) {
    return ctx.query.locale
  }
})
repo.I18N.initLocal(async function (i18n) {
  return async function () {
    i18n.addLocales({
      'zh_CN': {
        'sys_hello': '你好'
      },
      'en_US': {
        'sys_hello': 'hello'
      },
      'zh_TW': {
        'sys_hello': '妳好'
      }
    })
  }
})

// global request
repo.request = fetch
