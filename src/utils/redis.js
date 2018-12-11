/**
 * @author [Double]
 * @email [2637309949@mail.com]
 * @create date 2018-09-06 04:59:53
 * @modify date 2018-09-06 04:59:53
 * @desc [Redis自定义]
*/
const Redis = require('ioredis')
const fmt = require('util').format
const config = require('../config')

const formats = {
  token: 'token:%s',
};

function saveToken(redis) {
  return async function(item) {
    await redis.set(fmt(formats.token, item.accessToken), JSON.stringify(item))
  }
}

function findToken(redis) {
  return async function(accessToken) {
    let token = await redis.get(fmt(formats.token, accessToken))
    if(token) {
      return JSON.parse(token)
    }
  }
}

function revokeToken(redis) {
  return async function(accessToken) {
    await redis.del(fmt(formats.token, accessToken))
  }
}



/**
 * Redis重连机制(放弃官方自带)
 * @param {String} uri 链接
 * @param {Object} opts 配置参数
 * @param {Number} count 重连次数
 * @param {Function} cb 回调函数
 */
Redis.retryConnect = function (uri, opts, cb) {
  let retryCount = opts.retryCount || 5
  opts.lazyConnect = true
  const retryStrategy = function () {
    const redis = new Redis(uri, opts)
    redis.connect(function (err, data) {
      cb(err, data)
      if (err) {
        retryCount -= 1
        if (retryCount >= 0) setTimeout(retryStrategy, 3000)
      }
    })
    redis.saveToken = saveToken(redis)
    redis.findToken = findToken(redis)
    redis.revokeToken = revokeToken(redis)
    return redis
  }
  return retryStrategy()
}

module.exports = () => {
    module.exports = Redis.retryConnect(config.redis.uri, config.redis.opts, function (err) {
        if (err) {
          console.log(`Redis:${config.redis.uri} connect failed!`)
          console.error(err)
        } else {
          console.log(`Redis:${config.redis.uri} connect successfully!`)
        }
    })
}
