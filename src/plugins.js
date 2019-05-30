/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */

const _ = require('lodash')
const path = require('path')

const Identity = require('../../juglans-identity')
const Delivery = require('../../juglans-delivery')
const Captcha = require('../../juglans-captcha')
const Upload = require('../../juglans-upload')
const Roles = require('../../juglans-roles')
const Logs = require('../../juglans-logs')
const Limit = require('../../juglans-limit')

const { mongoose, logger, redis } = require('./addition')

module.exports = function (app) {
  // Add Req Rate Limit
  // Every 1s for `/api\/v1\/user*/`
  app.Use(Limit({
    frequency: {
      model: Limit.model.RedisModel({ redis }),
      passages: [/public\/*/],
      rules: [{
        methods: ['GET'],
        match: /api\/v1\/user*/,
        rate: 1
      }],
      async failureHandler (ctx) {
        ctx.status = 500
        ctx.body = {
          message: 'Rate Limited access, Pease Check Again Later!!!'
        }
      }
    }
  }))

  // Http Logs Plugin
  app.Use(Logs({
    logger: {
      path: path.join(__dirname, '../logger')
    }
    // use default print format
  }))

  // Delivery Plugin for public assert
  app.Use(Delivery({
    urlPrefix: '/public',
    root: path.join(__dirname, '../assets/public')
  }))

  // Captcha Plugin
  app.Use(Captcha({
    urlPrefix: '/captcha',
    maxAge: 60000,
    config: {
      size: 4,
      ignoreChars: '0o1i',
      noise: 1,
      color: true,
      background: '#cc9966'
    },
    cipher: {
      key: '5cbd5f603fd886000e3bb75e',
      iv: '5c9dbc4c9699fa000e1e0a98'
    }
  }))

  // Identity Plugin
  app.Use(Identity({
    async auth (ctx) {
      const form = _.pick(ctx.request.body, 'username', 'password')
      const User = mongoose.model('User')
      // ctx.status.captcha
      const one = await User.findOne({ username: form.username, password: form.password })
      if (!one) return null
      return {
        id: one._id,
        email: one.email,
        username: one.username,
        departments: one.department,
        roles: one.roles
      }
    },
    fakeTokens: ['DEBUG'],
    fakeUrls: [/\/api\/v1\/upload\/.*$/, /\/api\/v1\/favicon\.ico$/],
    model: Identity.model.RedisModel({ redis })
  }))

  // Upload Plugin
  Upload.strategys = [...Upload.strategys]
  app.Use(Upload({
    urlPrefix: '/public/upload',
    saveAnalysis: async ret => {
      console.log(JSON.stringify(ret[0].content))
    },
    findAnalysis: async cond => {
    }
  }))

  // Roles Plugin
  app.Use(Roles({
    roleHandler (ctx, action) {
      // const actions = Roles.transformAction(action)
      // const roles = actions.roles
      // const permits = actions.permits
      return true
    }
  }))

  // Roles Plugin
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

  // Mount auto model routes
  app.PostUse(mongoose.AutoHook)
}
