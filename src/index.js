/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */
const app = require('./app')
const utils = require('./utils/tools')

app.Run(({ httpProxy, config }) => {
  httpProxy.listen(utils.someOrElse(config.port, 3000), err => {
    if (!err) {
      console.log(`App:${config.name}`)
      console.log(`App:${config.NODE_ENV}`)
      console.log(`App:runing on Port:${config.port}`)
    } else {
      console.error(err)
    }
  })
})
