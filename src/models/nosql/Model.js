// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const mongoose = require('../../addition').mongoose
const Schema = mongoose.Schema

module.exports = _.assign({
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
