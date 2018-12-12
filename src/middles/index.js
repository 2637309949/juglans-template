const moment = require('moment')
const path = require('path')
const _ = require('lodash')
const redis = require('../utils/redis')
const Juglans = require('../juglans')

const mongoose = Juglans.mongoose
const Identity = Juglans.Plugins.Identity
const Delivery = Juglans.Plugins.Delivery
const apiDesc = {}
function measure (start, end, ctx) {
  const delta = end - start
  const status = ctx.status || 404
  const timeDelta = delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's'
  return { status, timeDelta, delta }
}

const logs = async function ({ router }) {
    router.use(async function (ctx, next) {
        const start = Date.now()
        let logInfo
        const SystemLog = mongoose.model('SystemLog')
        try {
          if (ctx.state.user) {
            const user = ctx.state.user
            const form = {
              _created: moment().unix(),
              userid: user._id,
              name: user.username,
              ip: ctx.ip,
              requestMethod: ctx.method.toUpperCase(),
              requestUrl: ctx.request.url.toLowerCase(),
              requestDesc: '',
              requestHeaders: ctx.headers,
              queryStringParams: ctx.query,
              requestBody: ctx.request.body
            }
            form.requestDesc = apiDesc[`${form.requestMethod} ${form.requestUrl}`]
            if (form.requestUrl.startsWith('/api')) {
              logInfo = `${moment().format('YYYY-MM-DD HH:mm:ss')} Log: ${user.username} ${user.id}, ${form.requestMethod} ${form.requestUrl} ${form.requestDesc}`
              await SystemLog.create([form])
            }
          } else if (ctx.state.fakeToken) {
            logInfo = `${moment().format('YYYY-MM-DD HH:mm:ss')} Log (fake token): ${ctx.req.method.toUpperCase()} ${ctx.request.url}`
          } else if (ctx.state.fakeUrl) {
            logInfo = `${moment().format('YYYY-MM-DD HH:mm:ss')} Log (fake url): ${ctx.req.method.toUpperCase()} ${ctx.request.url}`
          } else {
            logInfo = `${moment().format('YYYY-MM-DD HH:mm:ss')} Log (unauthorized): ${ctx.req.method.toUpperCase()} ${ctx.request.url}`
          }
          console.log(`<-- ${logInfo}`)
          await next()
          const { timeDelta, status } = measure(start, Date.now(), ctx)
          console.log(`--> ${logInfo} ${status} ${timeDelta}`)
        } catch (err) {
          throw err
        }
    })
}

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
          username: one.username
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
    obtainToken:  "/login",
    revokeToken:  "/logout",
  }
})

module.exports = [
    iden,
    logs,
    deli,
]
