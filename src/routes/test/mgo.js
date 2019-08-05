// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const logger = require('../../addition').logger
const userServices = require('../../services/user')
const I18N = require('../../addition').I18N

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
    try {
      let username = ctx.query.username
      username = username || ctx.request.body.username
      const isManager = await userServices.isManager(username)
      ctx.status = 200
      ctx.body = { isManager }
      throw new Error()
    } catch (error) {
      logger.error(error.stack || error.message)
      ctx.status = 500
      ctx.body = {
        message: I18N.i18nLocale('sys_error', 'Internal Server Error'),
        stack: error.stack || error.message
      }
    }
  })
}

module.exports = function ({ router, reverse }) {
  reverse.Register(isManager)
}
