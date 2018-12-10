/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2018-10-09 14:31:35
 * @modify date 2018-10-09 14:31:35
 * @desc [Juglans例子]
*/
const Juglans = require('./juglans')
const config = require('./config')
const middle = require('./utils/middle')
const inject = require('./utils/inject')
const event = require('./utils/event')

const app = new Juglans({ name: 'Juglans V1.0' })
app
  .config(config)
  .inject(inject)
  .middle(middle)
  .redis(function ({Redis, config}) {
    const redis = Redis.retryConnect(config.redis.uri, config.redis.opts, function (err) {
      if (err) {
        console.log(`Redis:${config.redis.uri} connect failed!`)
        console.error(err)
      } else {
        console.log(`Redis:${config.redis.uri} connect successfully!`)
      }
    })
    return redis
  })
  .mongo(function ({mongoose, config}) {
    mongoose.set('useCreateIndex', true)
    mongoose.retryConnect(config.mongo.uri, config.mongo.opts, function (err) {
      if (err) {
        console.log(`Mongodb:${config.mongo.uri} connect failed!`)
        console.error(err)
      } else {
        console.log(`Mongodb:${config.mongo.uri} connect successfully!`)
      }
    })
  })
  .run(function (err, config) {
    if (err) {
      console.error(err)
    } else {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    }
  })
  .on(Juglans.event.INSTANCE_UP_SUCCESSFUL, event.INSTANCE_UP_SUCCESSFUL)
  .on(Juglans.event.INSTANCE_UP_FAILING,    event.INSTANCE_UP_FAILING)
