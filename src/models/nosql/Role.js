// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const Model = require('./Model').Model
const mgoExt = require('../../addition').mgoExt
const logger = require('../../addition').logger

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
  type: {
    type: String,
    displayName: '角色类型',
    enum: ['101', '102'],
    default: '101'
  },
  permissions: [{
    type: String,
    displayName: '权限列表',
    ref: 'Permission'
  }]
}, Model), {})

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

module.exports = async function ({ router }) {
  const Param = mgoExt.Model('Param')
  await Param.addEnum({
    model: 'Role',
    key: 'type',
    value: [{
      key: '管理角色',
      value: '101'
    }, {
      key: '业务角色',
      value: '102'
    }]
  })
}
