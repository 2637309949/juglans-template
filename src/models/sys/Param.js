// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

const schema = new mongoose.Schema(Object.assign({}, CommonFields, {
  code: {
    type: String,
    unique: true,
    displayName: '参数编码'
  },
  desc: {
    type: String,
    displayName: '参数描述'
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    displayName: '参数值'
  }
}))

module.exports = function ({ router }) {
  mongoose.ext.Register({
    name: 'Param',
    displayName: '参数配置',
    schema: schema
  })
}
