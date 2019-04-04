const _ = require('lodash')
const path = require('path')

const Identity = require('../../juglans-identity')
const Delivery = require('../../juglans-delivery')
// const Proxy = require('../../juglans-proxy')
const Logs = require('../../juglans-logs')
const Roles = require('../../juglans-roles')
const Upload = require('../../juglans-upload')
const mongoose = require('./addition').mongoose
const logger = require('./addition').logger

module.exports = function (app) {
  // Proxy Plugin
  // app.Use(Proxy({
  //   host: 'http://xxx.com',
  //   match: /^\/api\/v1\/proxy\//,
  //   map: function (path) { return 'public/' + path }
  // }))

  // Logs, Delivery Plugin
  app.Use(
    Logs({
      record: async () => { }
    }),
    Delivery({ root: path.join(__dirname, '../assets') })
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

  // test roles
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
