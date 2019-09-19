// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const cfg = require('../../config')
const grpc = require('../../addition').grpc
const smgProto = require('../../grpc/srv//sendmessage').smgProto

function grpcHello ({ router }) {
  router.get('/test/grpc', async (ctx) => {
    const ret = await grpc(cfg.grpc.srv1)(smgProto.SendMessage, function (cli) {
      return new Promise((resolve, reject) => {
        cli.SendEmail({to: ['2637309949@qq.com']}, function (err, res) {
          if (err != null) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      })
    })
    ctx.status = 200
    ctx.body = ret
  })
}

module.exports = function ({ router, reverse }) {
  reverse.Register(grpcHello)
}
