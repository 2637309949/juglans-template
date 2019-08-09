// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const userServices = require('../../services/user')

/*
 * @api {get} /test/user/isManager  用户角色
 * @apiGroup Test
 * @apiDescription                  用户角色
 * @apiParam {String} username      用户名
 * @apiSuccessExample {json}
 *   HTTP/1.1 200 OK
 *  {
 *       "isManager": true,
 *  }
 */
function isManager ({ router }) {
  router.get('/test/mgo/user/isManager', async (ctx) => {
    let username = ctx.query.username
    username = username || ctx.request.body.username
    const isManager = await userServices.isManager(username)
    ctx.status = 200
    ctx.body = { isManager }
  })
}

module.exports = function ({ router, reverse }) {
  reverse.Register(isManager)
}
