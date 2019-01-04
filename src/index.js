require('./utils/redis')
require('./utils/mgo')

const Juglans = require('./juglans')
const config = require('./config')
const plugins= require('./plugins')
const inject = require('./utils/inject')
const Logs = Juglans.Plugins.Logs

const app = new Juglans({ name: 'Juglans V1.0' })
app.Config(config)
app.Inject(inject)
app.Use(Logs({
  record: async form => {
    // console.log(form)
  }
}))
app.Use(...plugins)
app.Use(function({ router }) {
  router.get('/test555', ctx => {
    ctx.body = 'test555'
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
