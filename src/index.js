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
const Identity = require('./plugins/Identity')
const Delivery = require('./plugins/Delivery')
const Logs = require('./plugins/Logs')
const Roles = require('./plugins/Roles')

const mongoose = require('./addition').mongoose
const app = new Juglans({ name: 'Juglans V1.0' })
app.Config(cfg, { name: 'juglans test v1.1' })
app.Inject(inject, { test: 'xx' }, { test: 'xx' })

app.Use(Roles({
  roleHandler(ctx, action) {
    const tfAction = Roles.transformAction(action)
    console.log(tfAction)
    return true
  }
}))

app.Use(
  Logs({
    record: async () => {}
  }),
  Delivery(),
  function({ router, roles }) {
    router.get('/juglans', roles.can('tf11@pr44;tf44'), ctx => {
      ctx.status = 200
      ctx.body = {
        message: 'juglans'
      }
    })
  }
)

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
    return  ['DEBUG']
  },
  // fakeTokens: ['DEBUG'],
  fakeUrls: [ /\/api\/v1\/upload\/.*$/, /\/api\/v1\/favicon\.ico$/ ],
  store: redis.hooks
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
