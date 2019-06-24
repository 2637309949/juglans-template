// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const logger = require('../addition').logger

/**
   * @api {get} /helloMq Queue接口
   * @apiGroup Queue
   * @apiDescription 有Token验证机制
   * @apiSuccessExample {json}
   *   HTTP/1.1 200 OK
   *    {
   *        "message": 'ok'
   *    }
   */
function helloMq ({ router, Queue }) {
  router.get('/helloMq', async (ctx, next) => {
    Queue.Push({ type: 'mqTest', body: { 'xx': 'xx' } })
    ctx.body = {
      'message': 'ok'
    }
  })
}

module.exports = function ({ Queue, reverse }) {
  Queue.addTactics('mqTest', { interval: 10, ctCount: 1 })
  Queue.Register('mqTest', function (form) {
    logger.info(JSON.stringify(form))
  })
  reverse.Register(helloMq)
}
