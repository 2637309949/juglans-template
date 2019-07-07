// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Base = require('./Base')
const mongoose = require('../../addition').mongoose
const mgoExt = require('../../addition').mgoExt
const logger = require('../../addition').logger

const defineSchema = new mongoose.Schema(mgoExt.DefineSchema(Base, {
  name_sc: {
    type: String,
    displayName: '角色名称',
    unique: true,
    required: '预警名称({PATH})不能为空'
  },
  name_tc: {
    type: String,
    displayName: '繁体名称'
  },
  name_en: {
    type: String,
    displayName: '英文名称'
  },
  type: {
    type: String,
    displayName: '角色类型',
    enum: ['管理角色', '业务角色'],
    default: '业务角色'
  },
  permissions: [{
    type: String,
    ref: 'Permission',
    displayName: '权限列表'
  }]
}))

mgoExt.Register({
  name: 'Role',
  displayName: '角色配置',
  schema: defineSchema,
  opts: {
    routeHooks: {
      list: {
        pre (ctx) {
          logger.info('Role model pre hook')
        }
      }
    }
  }
})
