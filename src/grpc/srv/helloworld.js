// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const PROTO_PATH = path.join(__dirname, '../pb/helloworld.proto')
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })

const helloProto = grpc.loadPackageDefinition(packageDefinition).pb

/**
 * Implements the SayHello RPC method.
 */
function sayHello (call, callback) {
  callback(null, {message: 'Hello ' + call.request.name})
}

module.exports = function ({ grpcProxy }) {
  grpcProxy.addService(helloProto.Greeter.service, {sayHello: sayHello})
}
module.exports.helloProto = helloProto
