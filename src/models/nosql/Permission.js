// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const Model = require('./Model')
const mgoExt = require('../../addition').mgoExt

const defineSchema = mgoExt.DefineSchema(_.assign({}, Model, {
  code: {
    type: String,
    unique: true,
    displayName: '权限编码',
    required: '权限编码({PATH})不能为空'
  },
  pid: {
    type: String,
    displayName: '上级权限',
    default: null
  },
  type: {
    type: String,
    displayName: '权限类型',
    enum: ['一级菜单', '二级菜单', '三级菜单', '按钮', '自定义'],
    default: '自定义'
  },
  holder: {
    type: String,
    displayName: '权限持有者',
    enum: ['系统', '用户'],
    default: '用户'
  }
}), {})

mgoExt.Register({
  name: 'Permission',
  displayName: '权限配置',
  schema: defineSchema
})
