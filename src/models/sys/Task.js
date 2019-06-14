// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

const defineSchema = new mongoose.Schema(Object.assign({}, CommonFields, {
  spec: {
    type: String,
    displayName: '任务周期',
    required: '任务名称({PATH})不能为空'
  },
  name: {
    type: String,
    displayName: '任务名称',
    unique: true,
    required: '任务名称({PATH})不能为空'
  },
  enable: {
    type: Boolean,
    displayName: '是否激活',
    default: true
  }
}))

// 建议在这里拓展TASK的GUI管理
module.exports = function ({ router }) {
  mongoose.Register({
    name: 'Task',
    displayName: '任务配置',
    schema: defineSchema
  })
}
