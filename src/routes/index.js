// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

module.exports = function ({ router, test, events }) {
  /**
     * @api {get} /hello 验证接口
     * @apiGroup Test
     * @apiDescription 有Token验证机制
     * @apiSuccessExample {json}
     *   HTTP/1.1 200 OK
     *    {
     *        "message": 'hello:test'
     *    }
     */
  router.get('/hello', (ctx, next) => {
    ctx.body = {
      message: 'hello:' + test
    }
  })
  events.on('hello', function (message) {
    console.log(message)
  })
  events.emit('hello', 'first message')
}
