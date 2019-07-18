// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model').Model
const EVENTS = require('../../juglans').events
const {SeqExt, Sequelize} = require('../../addition')
require('./User')

// defineSchema defined store model
const defineSchema = SeqExt.DefineSchema(model, {
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
  type: {
    type: Sequelize.ENUM('101', '102'),
    comment: '类别: 管理, 业务',
    defaultValue: '102'
  }
})

// Register defined Register store model
SeqExt.Register({
  schema: defineSchema,
  name: 'role',
  displayName: '权限'
})

const Role = SeqExt.Model('role')
const User = SeqExt.Model('user')

Role.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Role.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

module.exports = function ({ events }) {
  events.on(EVENTS.SYS_JUGLANS_PLUGINS_HTTPPROXY_LISTEN_SUCCEED, async function (message) {
    await new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve()
      }, 2000)
    })
    const Param = SeqExt.Model('param')
    await Param.addEnum({
      model: 'role',
      key: 'type',
      value: [{
        key: '管理',
        value: '101'
      },
      {
        key: '业务',
        value: '102'
      }]
    })
  })
}
module.exports.Role = Role
