require('./utils/redis')()
require('./utils/mgo')()

const Juglans = require('./juglans')
const config = require('./config')
const plugins= require('./plugins')
const inject = require('./utils/inject')
const Logs = Juglans.Plugins.Logs

const app = new Juglans({ name: 'Juglans V1.0' })
app.config(config)
app.inject(inject)
app.use(Logs({
  record: async form => {
    // console.log(form)
  }
}))
app.use(...plugins)
app.run(function (err, config) {
    if (!err) {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    } else {
      console.error(err)
    }
})