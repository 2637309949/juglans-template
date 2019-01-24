/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2019-01-12 01:24:19
 * @modify date 2019-01-12 01:24:19
 * @desc [description]
 */

const userServices = require('../services/user')
module.exports = function ({ router }) {
  /**
     * @api {get} /user/aux/manager 用户角色
     * @apiGroup Test
     * @apiDescription 有Token验证机制
     * @apiParam {String} username 用户名
     * @apiSuccessExample {json}
     *   HTTP/1.1 200 OK
     *    {
     *        "isManager": true,
     *    }
     */
  router.get('/user/aux/manager', async (ctx) => {
    try {
      let username = ctx.query.username
      username = username || ctx.request.body.username
      const isManager = await userServices.isManager(username)
      ctx.status = 200
      ctx.body = { isManager }
    } catch (error) {
      console.error(error.stack)
      ctx.status = 500
      ctx.body = { message: error.message }
    }
  })
}
