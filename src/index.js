/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */
require('./utils/redis')
require('./utils/mgo')

const config = require('./config')
const plugins= require('./plugins')
const Juglans = require('./juglans')
const inject = require('./utils/inject')

const { Logs } = Juglans.Plugins
const app = new Juglans({ name: 'Juglans V1.0' })
app.Config(config)
app.Inject(inject)
app.Use(Logs({
  record: async () => {
  }
}))
app.Use(...plugins)
app.Use(function({ router }) {
  router.get('/juglansWeb', ctx => {
    ctx.body = 'juglansWeb'
  })
})
app.Run(function (err, config) {
    if (!err) {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    } else {
      console.error(err)
    }
})
