// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) 2018-2020 Double All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
'use strict';
var grpc = require('grpc');
var message_pb = require('./message_pb.js');

function serialize_pb_CodeReply(arg) {
  if (!(arg instanceof message_pb.CodeReply)) {
    throw new Error('Expected argument of type pb.CodeReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_CodeReply(buffer_arg) {
  return message_pb.CodeReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_CodeRequest(arg) {
  if (!(arg instanceof message_pb.CodeRequest)) {
    throw new Error('Expected argument of type pb.CodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_CodeRequest(buffer_arg) {
  return message_pb.CodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_EmailReply(arg) {
  if (!(arg instanceof message_pb.EmailReply)) {
    throw new Error('Expected argument of type pb.EmailReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_EmailReply(buffer_arg) {
  return message_pb.EmailReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_EmailRequest(arg) {
  if (!(arg instanceof message_pb.EmailRequest)) {
    throw new Error('Expected argument of type pb.EmailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_EmailRequest(buffer_arg) {
  return message_pb.EmailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var MessageService = exports.MessageService = {
  // Sends a greeting
  sendEmail: {
    path: '/pb.Message/SendEmail',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.EmailRequest,
    responseType: message_pb.EmailReply,
    requestSerialize: serialize_pb_EmailRequest,
    requestDeserialize: deserialize_pb_EmailRequest,
    responseSerialize: serialize_pb_EmailReply,
    responseDeserialize: deserialize_pb_EmailReply,
  },
  sendCode: {
    path: '/pb.Message/SendCode',
    requestStream: false,
    responseStream: false,
    requestType: message_pb.CodeRequest,
    responseType: message_pb.CodeReply,
    requestSerialize: serialize_pb_CodeRequest,
    requestDeserialize: deserialize_pb_CodeRequest,
    responseSerialize: serialize_pb_CodeReply,
    responseDeserialize: deserialize_pb_CodeReply,
  },
};

exports.MessageClient = grpc.makeGenericClientConstructor(MessageService);
