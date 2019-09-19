// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const path = require('path')
const Delivery = require('./plugins/delivery')
const Identity = require('./plugins/identity')
const OpenApi = require('./plugins/openapi')
const Captcha = require('./plugins/captcha')
const Upload = require('./plugins/upload')
const Limit = require('./plugins/limit')
const Agent = require('./plugins/proxy')
const Roles = require('./plugins/roles')
const Logs = require('./plugins/logs')
const Queue = require('./plugins/queue')
const EVENTS = require('./juglans').events

const {
  logger, mgoExt, SeqExt, apidoc, I18N
} = require('./addition')

module.exports = function (app) {
  app.PreUse(I18N)
  app.PostUse(mgoExt)
  app.PostUse(SeqExt)
  app.PostUse(apidoc)
  app.ScanUse(path.join(__dirname, './{models,routes,tasks,openapi,grpc}/**/*.js'))
  app.Use(Agent)
  app.Use(Limit)
  app.Use(Logs)
  app.Use(Delivery)
  app.Use(Captcha)
  app.Use(Identity)
  app.Use(Upload)
  app.Use(Roles)
  app.Use(OpenApi)
  app.Use(Queue)
  app.Use(function ({ router, roles, events }) {
    events.on(EVENTS.EventsRunning, function (message) {
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
