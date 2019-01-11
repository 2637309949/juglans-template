const path = require('path')

module.exports = {
  name: 'Juglans V1.0',
  prefix: '/api/v1',
  port: 3001,
  debug: true,
  assetsDir: path.join(__dirname, '../../assets'),
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/test?authSource=admin',
    retryCount: 5,
    opts: {
      useNewUrlParser: true,
      poolSize: 1000,
      reconnectTries: Number.MAX_VALUE
    }
  },
  redis: {
    uri: 'redis://127.0.0.1:6379',
    retryCount: 5,
    opts: {
      maxRetriesPerRequest: 3,
      retryStrategy: function (times) {
        return null
      }
    }
  },
  depInject: {
    path: [
      path.join(__dirname, '../models/**/*.js'),
      path.join(__dirname, '../routes/**/*.js'),
      path.join(__dirname, '../tasks/**/*.js'),
    ],
    ignore: [
      '**/node_modules/**'
    ]
  },
  bodyParser: {
    strict: false,
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
