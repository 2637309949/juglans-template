// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const logger = require('../../addition').logger
const I18N = require('../../addition').I18N

/**
   * @api {get} /test/mq/hello         队列接口
   * @apiGroup Test
   * @apiDescription                   队列接口
   * @apiSuccessExample {json}
   *   HTTP/1.1 200 OK
   *    {
   *        "message": 'ok'
   *    }
   */
function helloMq ({ router, queue }) {
  queue.addTactics('mqTest', { interval: 10, ctCount: 1 })
  queue.Register('mqTest', function (form) {
    logger.info(JSON.stringify(form))
  })
  router.get('/test/mq/hello', async (ctx, next) => {
    queue.Push({ type: 'mqTest', body: { 'xx': 'xx' } })
    ctx.status = 200
    ctx.body = {
      message: I18N.i18nLocale('ok', 'ok')
    }
  })
}

module.exports = function ({ queue, reverse }) {
  reverse.Register(helloMq)
}
