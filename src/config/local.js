// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const path = require('path')

module.exports = {
  name: 'Juglans V1.0',
  prefix: '/api',
  port: 3001,
  debug: true,
  logger: {
    path: path.join(__dirname, '../../logger'),
    maxsize: 5242880
  },
  sql: {
    uri: 'mysql://root:111111@/juglans',
    opts: {
      dialect: 'mysql'
    }
  },
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/juglans?authSource=admin',
    retryCount: 5,
    opts: {
      useCreateIndex: true,
      useNewUrlParser: true,
      poolSize: 1000,
      reconnectTries: Number.MAX_VALUE
    }
  },
  redis: {
    uri: 'redis://127.0.0.1:6379',
    opts: {
      maxRetriesPerRequest: 3
    }
  },
  bodyParser: {
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    jsonLimit: '5mb',
    formLimit: '1mb',
    textLimit: '1mb',
    multipart: true,
    formidable: {
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../../assets/public/upload')
    }
  }
}
