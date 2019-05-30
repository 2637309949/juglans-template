const Identity = require('../../../juglans-identity')
const { mongoose, redis } = require('../addition')
const _ = require('lodash')

module.exports = Identity({
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
})
