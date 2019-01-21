/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */
require('./utils/redis')
require('./utils/mgo')

const _ = require('lodash')
const cfg = require('./config')
const Juglans = require('./juglans')
const redis = require('./utils/redis')
const inject = require('./utils/inject')

const mongoose = Juglans.mongoose
const { Logs, Identity, Delivery, Upload } = Juglans.Plugins

const app = new Juglans({ name: 'Juglans V1.0' })
app.Config(cfg, { name: 'juglans test v1.1' })
app.Inject(inject, { test: 'xx' }, { test: 'xx' })
app.Use(
  Logs({
    record: async () => {}
  }),
  Delivery(),
  function({ router }) {
    router.get('/hello', ctx => {
      ctx.body = 'juglans'
    })
  }
)
app.Use(Identity({
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
  fakeUrls: [ /\/api\/v1\/upload\/.*$/, /\/api\/v1\/favicon\.ico$/ ],
  store: {
    saveToken: redis.hooks.saveToken,
    revokeToken: redis.hooks.revokeToken,
    findToken: redis.hooks.findToken,
  }
}))
app.Run(function (err, config) {
    if (!err) {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    } else {
      console.error(err)
    }
})
