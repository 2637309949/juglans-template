/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-05 14:31:34
 * @modify date 2019-01-05 14:31:34
 * @desc [Example Instance]
 */
const app = require('./app')
const logger = require('./addition').logger
const utils = require('./utils/tools')

app.Run(({ httpProxy, config, router, events }) => {
  httpProxy.listen(utils.someOrElse(config.port, 3000), err => {
    if (!err) {
      logger.info(`App:${config.name}`)
      logger.info(`App:${config.NODE_ENV}`)
      logger.info(`App:runing on Port:${config.port}`)
      events.emit('app:events:listen:finish', 'successful')
    } else {
      logger.error(err)
    }
  })
})
