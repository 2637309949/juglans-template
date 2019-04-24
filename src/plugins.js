const _ = require('lodash')
const path = require('path')

const Identity = require('../../juglans-identity')
const Delivery = require('../../juglans-delivery')
const Logs = require('../../juglans-logs')
const Roles = require('../../juglans-roles')
const Upload = require('../../juglans-upload')
const Captcha = require('../../juglans-captcha')
const mongoose = require('./addition').mongoose
const logger = require('./addition').logger

module.exports = function (app) {
  // Logs, Delivery Plugin
  app.Use(
    Logs({
      record: async () => { }
    }),
    Delivery({ root: path.join(__dirname, '../assets') })
  )

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
      const one = await User.findOne({ username: form.username, password: form.password })
      if (one) {
        return {
          id: one._id,
          email: one.email,
          username: one.username,
          departments: one.department,
          roles: one.roles
        }
      } else {
        return null
      }
    },
    async fakeTokens () {
      return ['DEBUG']
    },
    // fakeTokens: ['DEBUG'],
    fakeUrls: [/\/api\/v1\/upload\/.*$/, /\/api\/v1\/favicon\.ico$/]
  }))

  // Roles Plugin
  app.Use(Roles({
    roleHandler (ctx, action) {
      const tfAction = Roles.transformAction(action)
      console.log(tfAction)
      return true
    }
  }))

  // Roles Plugin
  app.Use(function ({ router, roles }) {
    router.get('/juglans', roles.can('tf11@pr44;tf44'), async ctx => {
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
