/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */

const { mongoose, logger } = require('./addition')
const Delivery = require('./plugins/Delivery')
const Identity = require('./plugins/Identity')
const OpenApi = require('./plugins/OpenApi')
const Captcha = require('./plugins/Captcha')
const Upload = require('./plugins/Upload')
const Limit = require('./plugins/Limit')
const Roles = require('./plugins/Roles')
const Logs = require('./plugins/Logs')
const openapi = require('./openapi')

module.exports = function (app) {
  app.PostUse(mongoose.AutoHook)
  app.Use(Limit)
  app.Use(Logs)
  app.Use(Delivery)
  app.Use(Captcha)
  app.Use(Identity)
  app.Use(Upload)
  app.Use(Roles)
  app.Use(OpenApi)
  app.Use(openapi)
  app.Use(function ({ router, roles, events }) {
    events.on('app:events:listen:finish', function (message) {
      console.log(message)
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
