// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const mongoose = require('../../addition').mongoose
const mgoExt = require('../../addition').mgoExt
const Schema = mongoose.Schema

const Model = {
  createdAt: {
    type: Date,
    displayName: '创建时间',
    require: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    displayName: '创建人',
    ref: 'User'
  },
  updatedAt: {
    type: Date,
    displayName: '修改时间',
    remark: 'UNIX时间戳'
  },
  updator: {
    type: Schema.Types.ObjectId,
    displayName: '修改人',
    ref: 'User'
  },
  deletedAt: {
    type: Date,
    displayName: '删除时间',
    remark: 'UNIX时间戳'
  },
  deleter: {
    type: Schema.Types.ObjectId,
    displayName: '删除人',
    ref: 'User'
  }
}

function withPreset (model) {
  return _.assign(model, {
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports.Model = Model
module.exports.withPreset = withPreset
module.exports.Schema = function (model, opts = {}) {
  return mgoExt.Schema(_.assign(model, Model), opts)
}
