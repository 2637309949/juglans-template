/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */

const Identity = require('./Identity')
const Captcha = require('./Captcha')
const Roles = require('./Roles')
const Logs = require('./Logs')
const Limit = require('./Limit')
const Delivery = require('./Delivery')
const Upload = require('./Upload')

const { mongoose, logger } = require('../addition')

module.exports = function (app) {
  app.PostUse(mongoose.AutoHook)
  app.Use(Limit)
  app.Use(Logs)
  app.Use(Delivery)
  app.Use(Captcha)
  app.Use(Identity)
  app.Use(Upload)
  app.Use(Roles)
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
