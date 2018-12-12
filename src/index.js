require('./utils/redis')()
require('./utils/mgo')()

const Juglans = require('./juglans')
const config = require('./config')
const middle = require('./middles')
const inject = require('./utils/inject')

const app = new Juglans({ name: 'Juglans V1.0' })
app
  .config(config)
  .inject(inject)
  .middle(...middle)
  .run(function (err, config) {
    if (err) {
      console.error(err)
    } else {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    }
  })