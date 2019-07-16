// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const User = require('./User').User
const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

// defineSchema defined store model
const defineSchema = SeqExt.DefineSchema(model, {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '角色名称'
  },
  type: {
    type: Sequelize.ENUM('101', '102'),
    comment: '角色类别: 管理, 业务',
    defaultValue: '102'
  }
})

// Register defined Register store model
const Role = SeqExt.Register({
  schema: defineSchema,
  name: 'role',
  displayName: '权限'
})

Role.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Role.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

module.exports.Role = Role
