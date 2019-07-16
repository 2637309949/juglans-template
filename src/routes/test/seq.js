// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const SeqExt = require('../../addition').SeqExt

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

module.exports = function ({ router, reverse }) {
  reverse.Register(m2m)
}
