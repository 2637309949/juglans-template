// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const SeqExt = require('../../addition').SeqExt
const logger = require('../../addition').logger
const identity = require('../../plugins/identity')

/**
 * @api {get} /test/seq/init                      seq数据初始化
 * @apiGroup Test
 * HTTP/1.1 200 OK
 *   {
 *      "message": "ok"
 *   }
**/
function init ({ router }) {
  router.get('/test/seq/init', async (ctx, next) => {
    try {
      await SeqExt.sequelize.transaction(function (t) {
        var options = { raw: true, transaction: t }
        return SeqExt.sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
          .then(async function () {
            // await SeqExt.sequelize.query('DROP DATABASE IF EXISTS juglans', null, options)
            // await SeqExt.sequelize.query('CREATE DATABASE juglans', null, options)
            // await SeqExt.sequelize.query('USE juglans', null, options)
          })
          .then(async function () {
            await SeqExt.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
          })
      }).then(async function () {
      // 1. create user table
        const user1 = await SeqExt.Model('user').create({
          name: 'John',
          age: 23,
          password: '11111234'
        })
        // 2. create store table
        await SeqExt.Model('store').create({
          name: 'John',
          _creator: user1.id,
          _updator: user1.id,
          address: 'gz tianhe'
        })
        // 3. create permission, role, role2permission table
        const permissionId = await SeqExt.Model('permission').create({
          code: 'XDF09E3',
          name: '财务财年统计',
          _creator: user1.id,
          _updator: user1.id,
          type: '5',
          holder: '2'
        })
        const roleId = await SeqExt.Model('role').create({
          name: '财务部',
          _creator: user1.id,
          _updator: user1.id,
          type: '2'
        })
        await SeqExt.Model('role2permission').create({
          permission_id: roleId.id,
          role_id: permissionId.id,
          _creator: user1.id,
          _updator: user1.id
        })
        // 4. create params
        const param1 = await SeqExt.Model('param').create({
          name: '测试',
          code: 'test',
          _creator: user1.id,
          _updator: user1.id
        })
        await SeqExt.Model('paramitem').create({
          param_id: param1.id,
          category: 'Test',
          key: 'test_ket1',
          value: 'test_value1',
          _creator: user1.id,
          _updator: user1.id
        })
      })
      ctx.body = {
        message: 'ok'
      }
    } catch (error) {
      logger.error(error.stack || error.message)
      ctx.body = {
        message: error.stack || error.message
      }
    }
  })
}

function seqLogin ({ router }) {
  router.get('/test/mock/seq/login', async (ctx, next) => {
    try {
      const User = SeqExt.Model('user')
      const user = User.findOne({name: 'preset'})
      if (user) {
        const info = await identity.obtainToken(user)
        ctx.cookies.set('accessToken', info.accessToken,
          {
            maxAge: 12 * 60 * 60 * 1000
          }
        )
        ctx.body = info.accessToken
      }
    } catch (error) {
      logger.error(error.stack || error.message)
      ctx.body = {
        message: error.stack || error.message
      }
    }
  })
}

function mgoLogin ({ router }) {
  router.get('/test/mock/mgo/login', async (ctx, next) => {})
}

module.exports = function ({ router, reverse }) {
  reverse.Register(init)
  reverse.Register(seqLogin)
  reverse.Register(mgoLogin)
}