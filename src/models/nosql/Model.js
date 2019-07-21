// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const mongoose = require('../../addition').mongoose
const Schema = mongoose.Schema

module.exports.Model = _.assign({
  creator: {
    type: Schema.Types.ObjectId,
    displayName: '创建人',
    ref: 'User'
  },
  updator: {
    type: Schema.Types.ObjectId,
    displayName: '修改人',
    ref: 'User'
  },
  deleter: {
    type: Schema.Types.ObjectId,
    displayName: '删除人',
    ref: 'User'
  }
})

module.exports.withPreset = function (obj) {
  return _.merge({creator: '5d2fe40d7dead1c7924b3dc2', updator: '5d2fe40d7dead1c7924b3dc2'}, obj)
}

module.exports.presetUser = function () {
  return {
    _id: '5d2fe40d7dead1c7924b3dc2',
    name: 'preset',
    password: '123456',
    creator: '5d2fe40d7dead1c7924b3dc2',
    updator: '5d2fe40d7dead1c7924b3dc2'
  }
}

module.exports.presetRole = function () {
  return {
    _id: '1d7fe40d7dead1c7924b6dc2',
    creator: '5d2fe40d7dead1c7924b3dc2',
    updator: '5d2fe40d7dead1c7924b3dc2',
    name: '管理员',
    code: 'XV67D5',
    tyle: '101'
  }
}
