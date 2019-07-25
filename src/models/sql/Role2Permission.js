// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

// ensure permission model hased been inited
require('./Role')
require('./User')

const model = require('./Model')
const {
  SeqExt,
  Sequelize
} = require('../../addition')

// defineSchema defined RolePermission model
const defineSchema = model.Define({
  role_id: {
    type: Sequelize.INTEGER
  },
  permission_id: {
    type: Sequelize.INTEGER,
    comment: 'Param外键'
  }
})

// Register defined Register store model
SeqExt.Register({
  schema: defineSchema,
  name: 'Role2Permission',
  displayName: '权限与角色关系',
  autoHook: false
})

const RolePermisson = SeqExt.Model('Role2Permission')
const Permission = SeqExt.Model('Permission')
const User = SeqExt.Model('User')
const Role = SeqExt.Model('Role')

// many2many
RolePermisson.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
RolePermisson.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

Role.belongsToMany(Permission, {through: { model: RolePermisson, unique: false }, foreignKey: 'permission_id', as: 'permissions'})
Permission.belongsToMany(Role, {through: { model: RolePermisson, unique: false }, foreignKey: 'role_id', as: 'roles'})
