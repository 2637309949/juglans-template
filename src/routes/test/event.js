// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const logger = require('../../addition').logger
const I18N = require('../../addition').I18N

/**
 * @api {get} /test/hello  验证接口
 * @apiGroup Test
 * @apiDescription         有Token验证机制
 * @apiSuccessExample {json}
 *   HTTP/1.1 200 OK
 *    {
 *        "message": 'hello'
 *    }
 */
function hello ({ router }) {
  router.get('/test/hello', (ctx, next) => {
    ctx.status = 200
    ctx.body = {
      message: I18N.i18nLocale('sys_hello'),
      stack: null
    }
  })
}

function helloEvent ({ router, test, events, reverse }) {
  events.on('hello', function (message) {
    logger.info(message)
  })
  events.emit('hello', 'first message')
}

module.exports = function ({ router, test, events, reverse }) {
  reverse.Register(hello)
  reverse.Register(helloEvent)
}
