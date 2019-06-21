// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

const defineSchema = new mongoose.Schema(Object.assign({}, CommonFields, {
  name_sc: {
    type: String,
    displayName: '菜单名称'
  },
  name_tc: {
    type: String,
    displayName: '繁体名称'
  },
  name_en: {
    type: String,
    displayName: '英文名称'
  },
  uri: {
    type: String,
    displayName: '菜单地址'
  },
  icon: {
    type: String,
    displayName: '菜单图标'
  },
  parent: {
    type: String,
    ref: 'Menu',
    displayName: '父级菜单'
  },
  is_active: {
    type: Boolean,
    displayName: '是否启用',
    default: true
  },
  is_out: {
    type: Boolean,
    displayName: '是否外链',
    default: false
  },
  permission_code: {
    type: String,
    displayName: '权限编码'
  },
  order: {
    type: Number,
    displayName: '显示顺序'
  }
}))

module.exports = function ({ router }) {
  mongoose.ext.Register({
    name: 'Menu',
    displayName: '菜单配置',
    schema: defineSchema
  })
}
