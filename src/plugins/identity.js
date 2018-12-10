/**
 * 认证插件
 */
const _ = require('lodash')
const Juglans = require('../juglans')
const mongoose = Juglans.mongoose
const Identity = Juglans.Plugins.Identity

module.exports = new Identity({
    expiresIn: '24h',
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
            username: one.username
          }
        } else {
          return null
        }
    },
    fakeUrls: [],
    fakeTokens: [],
    store: {
      saveToken: async function(item) {
        const AuthToken = mongoose.model('AuthToken')
        return AuthToken.create([item])
      },
      revokeToken: async function(accessToken) {
        const AuthToken = mongoose.model('AuthToken')
        return AuthToken.updateOne({ accessToken, _dr: false }, { $set: { _dr: true } })
      },
      findToken: async function (accessToken) {
        const AuthToken = mongoose.model('AuthToken')
        const result = await AuthToken.findOne({ accessToken, _dr: false })
        return result && result._doc
      }
    }
})