// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const Model = require('./Model').Model
const { mongoose, mgoExt } = require('../../addition')
const Schema = mongoose.Schema

const defineSchema = mgoExt.DefineSchema(_.assign({
  name: {
    type: String,
    displayName: '名称',
    required: '名称({PATH})不能为空'
  },
  code: {
    type: String,
    displayName: '编码',
    unique: true,
    required: '编码({PATH})不能为空'
  },
  pid: {
    type: Schema.Types.ObjectId,
    displayName: '上级权限',
    ref: 'Permission'
  },
  type: {
    type: String,
    displayName: '权限类型',
    enum: ['101', '102', '103', '104', '105'],
    default: '105'
  },
  holder: {
    type: String,
    displayName: '权限持有者',
    enum: ['101', '102'],
    default: '101'
  }
}, Model), {})

mgoExt.Register({
  name: 'Permission',
  displayName: '权限配置',
  schema: defineSchema
})

module.exports = async function ({ router }) {
  const Param = mgoExt.Model('Param')
  await Param.addEnum({
    model: 'Permission',
    key: 'type',
    value: [{
      key: '一级菜单',
      value: '101'
    }, {
      key: '二级菜单',
      value: '102'
    }, {
      key: '三级菜单',
      value: '103'
    }, {
      key: '按钮',
      value: '104'
    }, {
      key: '自定义',
      value: '105'
    }]
  })
  await Param.addEnum({
    model: 'Permission',
    key: 'holder',
    value: [{
      key: '系统',
      value: '101'
    }, {
      key: '用户',
      value: '102'
    }]
  })
}
