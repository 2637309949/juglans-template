// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const cfg = require('../../config')
const grpc = require('../../addition').grpc
const messages = require('../../grpc/pb/sendmessage_pb')
const services = require('../../grpc/pb/sendmessage_grpc_pb')

function grpcHello ({ router }) {
  router.get('/test/grpc', async (ctx) => {
    const ret = await grpc(cfg.grpc.srv1)(services.SendMessageClient, function (cli) {
      return new Promise((resolve, reject) => {
        const request = new messages.EmailRequest()
        request.setToList(['2637309949@qq.com'])
        cli.sendEmail(request, function (err, res) {
          if (err != null) {
            reject(err)
          } else {
            resolve(res.toObject())
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
