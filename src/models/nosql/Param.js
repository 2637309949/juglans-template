// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const Model = require('./Model')
const logger = require('../../addition').logger
const { mongoose, mgoExt } = require('../../addition')
const Schema = mongoose.Schema

// 定义模型结构
const defineSchema = mgoExt.DefineSchema(_.assign({
  name: {
    type: String,
    displayName: '名称'
  },
  code: {
    type: String,
    displayName: '参数编码',
    unique: true
  },
  value: {
    type: Schema.Types.Mixed,
    displayName: '参数值'
  }
}, Model), {})

// addEnum defined add enum type
defineSchema.statics.addEnum = async function ({ model, key, value }) {
  const Param = mgoExt.Model('Param')
  let one = await Param.findOne({ code: 'enum' })
  if (!one) {
    one = new Param({ name: '枚举类型', code: 'enum', value: {} })
  }
  if (!one.value[model]) {
    one.value[model] = {}
  }
  one.value[model][key] = value
  one.markModified('value')
  await one.save()
}

mgoExt.Register({
  name: 'Param',
  displayName: '参数配置',
  schema: defineSchema
})

// init defined prepare
async function init () {
  logger.info('Init Param ...')
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
init()
