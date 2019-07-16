// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const SeqExt = require('../../addition').SeqExt
const logger = require('../../addition').logger

/**
 * @api {get} /test/seq/role2permission           角色权限列表
 * @apiGroup Test
 * @apiDescription                                角色权限列表
 * @apiSuccess        {Object[]}  rp              实体类数组
 * @apiSuccess        {String}    rp.Name         名称
 * @apiSuccess        {String}    rp.Password     密码
 * @apiSuccessExample {json}                      正常返回
 * HTTP/1.1 200 OK
 * [
 *     {
 *         "id": 1,
 *         "createdAt": "2019-07-12T14:09:29.000Z",
 *         "deletedAt": null,
 *         "updatedAt": "2019-07-12T14:09:29.000Z",
 *         "_creator": 1,
 *         "_modifier": 1,
 *         "name": "财务部",
 *         "type": "2",
 *         "permissions": [
 *             {
 *                 "id": 1,
 *                 "createdAt": "2019-07-12T14:09:29.000Z",
 *                 "deletedAt": null,
 *                 "updatedAt": "2019-07-12T14:09:29.000Z",
 *                 "_creator": 1,
 *                 "_modifier": 1,
 *                 "code": "XDF09E3",
 *                 "name": "财务财年统计",
 *                 "pid": null,
 *                 "type": "5",
 *                 "holder": "2",
 *                 "role2permission": {
 *                     "createdAt": "2019-07-12T14:09:29.000Z",
 *                     "deletedAt": null,
 *                     "updatedAt": "2019-07-12T14:09:29.000Z",
 *                     "_creator": null,
 *                     "_modifier": null,
 *                     "name": null,
 *                     "_permission": 1,
 *                     "_role": 1
 *                 }
 *             }
 *         ]
 *     }
 * ]
**/
function m2m ({ router }) {
  router.get('/test/seq/role2permission', async (ctx, next) => {
    const Model = SeqExt.Model('role')
    const list = await Model.findAll({
      where: {},
      include: [
        {
          model: SeqExt.Model('permission'),
          as: 'permissions'
        }
      ]
    })
    ctx.body = list
  })
}

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
        await SeqExt.Model('user')
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

module.exports = function ({ router, reverse }) {
  reverse.Register(m2m)
  reverse.Register(init)
}
