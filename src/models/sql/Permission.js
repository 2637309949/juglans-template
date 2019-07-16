// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const EVENTS = require('../../juglans').events
const SeqExt = require('../../addition').SeqExt
const User = require('./User').User
const Sequelize = require('../../addition').Sequelize

// defineSchema defined store model
const defineSchema = SeqExt.DefineSchema(model, {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '编码'
  },
  name: {
    type: Sequelize.STRING,
    comment: '名称'
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
const Permission = SeqExt.Register({
  schema: defineSchema,
  name: 'permission',
  displayName: '权限'
})

Permission.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Permission.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

module.exports = function ({ events }) {
  events.on(EVENTS.SYS_JUGLANS_PLUGINS_HTTPPROXY_LISTEN_SUCCEED, async function (message) {
    await new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve()
      }, 2000)
    })
    const Param = SeqExt.Model('param')
    await Param.addEnum({
      model: 'permission',
      key: 'type',
      value: [{
        key: '一级菜单',
        value: '101',
        _creator: 1,
        _updator: 1
      }, {
        key: '二级菜单',
        value: '102',
        _creator: 1,
        _updator: 1
      }, {
        key: '三级菜单',
        value: '103',
        _creator: 1,
        _updator: 1
      }, {
        key: '按钮',
        value: '104',
        _creator: 1,
        _updator: 1
      }, {
        key: '自定义',
        value: '105',
        _creator: 1,
        _updator: 1
      }]
    })
  })
}
module.exports.Permission = Permission
