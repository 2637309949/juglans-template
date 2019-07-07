// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Delivery = require('./plugins/Delivery')
const Identity = require('./plugins/Identity')
const OpenApi = require('./plugins/OpenApi')
const Captcha = require('./plugins/Captcha')
const Upload = require('./plugins/Upload')
const Limit = require('./plugins/Limit')
const Proxy = require('./plugins/Proxy')
const Roles = require('./plugins/Roles')
const Logs = require('./plugins/Logs')
const Queue = require('./plugins/Queue')

const {
  logger, mgoExt, SeqExt, apidoc
} = require('./addition')

module.exports = function (app) {
  app.PostUse(mgoExt)
  app.PostUse(SeqExt)
  app.Use(Proxy)
  app.Use(Limit)
  app.Use(Logs)
  app.Use(Delivery)
  app.Use(Captcha)
  app.Use(Identity)
  app.Use(Upload)
  app.Use(Roles)
  app.Use(OpenApi)
  app.Use(Queue)
  app.PostUse(apidoc)
  app.Use(function ({ router, roles, events }) {
    events.on('app:events:listen:finish', function (message) {
      logger.info(message)
    })
    router.get('/juglans*', roles.can('tf11@pr44;tf44'), async ctx => {
      logger.error('test error')
      logger.info('test info')
      ctx.status = 200
      ctx.body = {
        message: 'juglans'
      }
    })
  })
}
