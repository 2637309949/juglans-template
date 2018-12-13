const moment = require('moment')
const path = require('path')
const _ = require('lodash')

const redis = require('../utils/redis')
const Juglans = require('../juglans')

const mongoose = Juglans.mongoose
const Identity = Juglans.Plugins.Identity
const Delivery = Juglans.Plugins.Delivery
const Logs = Juglans.Plugins.Logs

const logs = Logs({ record: () => {} })

const deli = Delivery({
  root: path.join(__dirname, '../../assets')
})

const iden = Identity({
  expiresIn: 24,
  auth: async function auth (ctx) {
      const form = _.pick(ctx.request.body, 'username', 'password')
      const User = mongoose.model('User')
      const one = await User.findOne({
        _dr: { $ne: true },
        username: form.username,
        password: form.password
      })
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
  fakeTokens: ['DEBUG'],
  fakeUrls: [
    /\/api\/v1\/upload\/.*$/,
    /\/api\/v1\/favicon\.ico$/,
  ],
  store: {
    saveToken: redis.hooks.saveToken,
    revokeToken: redis.hooks.revokeToken,
    findToken: redis.hooks.findToken,
  },
  route: {
    obtainToken:  "/obtainToken",
    revokeToken:  "/revokeToken",
    refleshToken:  "/refleshToken",
  }
})

module.exports = [
    iden,
    logs,
    deli,
]
