// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const messages = require('../pb/sendmessage_pb')
const services = require('../pb/sendmessage_grpc_pb')

// 注意： proto3定义的大写函数，grpc_tools_node_protoc插件生成的代码自动转成小写开头
function sendEmail (call, callback) {
  const reply = new messages.EmailReply()
  reply.setMessage('send successfully')
  reply.setStatus(1)
  callback(null, reply)
}

// 注意： proto3定义的大写函数，grpc_tools_node_protoc插件生成的代码自动转成小写开头
function sendCode (call, callback) {
  const reply = new messages.CodeReply()
  reply.setMessage('send successfully')
  reply.setStatus(1)
  callback(null, reply)
}

module.exports = function ({ grpcProxy }) {
  grpcProxy.addService(services.SendMessageService, {sendEmail, sendCode})
}
