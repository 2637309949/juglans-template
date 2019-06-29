// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const base = require('./Base')
const User = require('./User').User
const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

// defineSchema defined store model
const defineSchema = SeqExt.DefineSchema(base, {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '角色名称'
  },
  type: {
    type: Sequelize.ENUM('1', '2'),
    comment: '角色类别: 管理, 业务',
    defaultValue: '1'
  }
})

// Register defined Register store model
const Role = SeqExt.Register({
  schema: defineSchema,
  name: 'role',
  displayName: '权限'
})

Role.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Role.belongsTo(User, {foreignKey: '_modifier', as: 'modifier'})

module.exports.Role = Role
