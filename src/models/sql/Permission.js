// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const EVENTS = require('../../juglans').events
const {SeqExt, Sequelize} = require('../../addition')
require('./User')

// defineSchema defined store model
const defineSchema = model.Define({
  name: {
    type: Sequelize.STRING,
    comment: '名称'
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '编码'
  },
  pid: {
    type: Sequelize.INTEGER,
    comment: '父级ID'
  },
  type: {
    type: Sequelize.ENUM('101', '102', '103', '104', '105'),
    comment: '权限类别: 一级菜单, 二级菜单, 三级菜单, 按钮, 自定义',
    defaultValue: '105'
  },
  holder: {
    type: Sequelize.ENUM('101', '102'),
    comment: '持有者类别: 系统, 用户',
    defaultValue: '102'
  }
})

// Register defined Register store model
SeqExt.Register({
  schema: defineSchema,
  name: 'Permission',
  displayName: '权限'
})

const Permission = SeqExt.Model('Permission')
const User = SeqExt.Model('User')

Permission.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Permission.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

module.exports = function ({ events }) {
  events.on(EVENTS.SYS_JUGLANS_PLUGINS_HTTPPROXY_LISTEN_SUCCEED, async function (message) {
    await new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve()
      }, 2000)
    })
    const Param = SeqExt.Model('Param')
    await Param.addEnum({
      model: 'permission',
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
  })
}
