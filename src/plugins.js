const _ = require('lodash')
const path = require('path')

const Identity = require('../../juglans-identity')
const Delivery = require('../../juglans-delivery')
const Captcha = require('../../juglans-captcha')
const Upload = require('../../juglans-upload')
const Roles = require('../../juglans-roles')
const Logs = require('../../juglans-logs')
const { mongoose, logger } = require('./addition')

module.exports = function (app) {
  // Logs Plugin
  app.Use(
    Logs({
      record: async () => { }
    })
  )

  // Delivery Plugin
  app.Use(Delivery({
    urlPrefix: '/public',
    root: path.join(__dirname, '../assets')
  }))

  // Captcha Plugin
  app.Use(
    Captcha({
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
    })
  )

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
    fakeUrls: [/\/api\/v1\/upload\/.*$/, /\/api\/v1\/favicon\.ico$/]
  }))

  // Roles Plugin
  app.Use(Roles({
    roleHandler (ctx, action) {
      Roles.transformAction(action)
      return true
    }
  }))

  // Roles Plugin
  app.Use(function ({ router, roles }) {
    router.get('/juglans*', roles.can('tf11@pr44;tf44'), async ctx => {
      logger.error('test error')
      logger.info('test info')
      ctx.status = 200
      ctx.body = {
        message: 'juglans'
      }
    })
  })

  // Upload Plugin
  Upload.strategys = [...Upload.strategys]
  app.Use(Upload({
    saveAnalysis: async ret => {
      console.log(JSON.stringify(ret[0].content))
    },
    findAnalysis: async cond => {
    },
    uploadPrefix: '/public/upload'
  }))
}
