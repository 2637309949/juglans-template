// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const PROTO_PATH = path.join(__dirname, '../pb/sendmessage.proto')
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })

const smgProto = grpc.loadPackageDefinition(packageDefinition).pb

// SendEmail defined send email
function SendEmail (call, callback) {
  callback(null, {status: 1, message: 'send successfully'})
}

module.exports = function ({ grpcProxy }) {
  grpcProxy.addService(smgProto.SendMessage.service, {SendEmail: SendEmail})
}
module.exports.smgProto = smgProto
