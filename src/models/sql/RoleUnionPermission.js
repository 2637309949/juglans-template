// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

// ensure permission model hased been inited
const Permission = require('./Permission').Permission
const Role = require('./Role').Role
const User = require('./User').User

const model = require('./Model')
const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

// defineSchema defined RolePermission model
const defineSchema = SeqExt.DefineSchema(model, {
  name: {
    type: Sequelize.STRING
  }
})

// Register defined Register store model
const RolePermisson = SeqExt.Register({
  schema: defineSchema,
  name: 'role_permission',
  displayName: '权限与角色关系',
  autoHook: false
})

// many2many
RolePermisson.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
RolePermisson.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

Role.belongsToMany(Permission, {through: { model: RolePermisson, unique: false }, foreignKey: '_permission', as: 'permissions'})
Permission.belongsToMany(Role, {through: { model: RolePermisson, unique: false }, foreignKey: '_role', as: 'roles'})
