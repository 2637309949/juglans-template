// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const grpc = require('../../addition').grpc
const helloProto = require('../../grpc/srv/helloworld').helloProto

function grpcHello ({ router }) {
  router.get('/test/grpc', async (ctx) => {
    const ret = await grpc('127.0.0.1:3002')(helloProto.Greeter, function (cli) {
      return new Promise((resolve, reject) => {
        cli.sayHello({name: 'hello'}, function (err, response) {
          if (err != null) {
            reject(err)
          } else {
            resolve(response.message)
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
