/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */
require('./addition')

const _ = require('lodash')
const cfg = require('./config')
const Juglans = require('./juglans')
const inject = require('./inject')


const app = new Juglans({ name: 'Juglans V1.0' })
app.Config(cfg, { name: 'juglans test v1.1' })
app.Inject(inject, { test: 'xx' }, { test: 'xx' })

require('./plugins')(app)

app.Run(function (err, config) {
    if (!err) {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    } else {
      console.error(err)
    }
})
