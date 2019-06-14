// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

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
