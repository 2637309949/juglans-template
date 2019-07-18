// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

// ensure permission model hased been inited
require('./Role')
require('./User')

const model = require('./Model').Model
const {SeqExt, Sequelize} = require('../../addition')

// defineSchema defined RolePermission model
const defineSchema = SeqExt.DefineSchema(model, {
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
  name: 'role2permission',
  displayName: '权限与角色关系',
  autoHook: false
})

const RolePermisson = SeqExt.Model('role2permission')
const Permission = SeqExt.Model('permission')
const User = SeqExt.Model('user')
const Role = SeqExt.Model('role')

// many2many
RolePermisson.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
RolePermisson.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

Role.belongsToMany(Permission, {through: { model: RolePermisson, unique: false }, foreignKey: 'permission_id', as: 'permissions'})
Permission.belongsToMany(Role, {through: { model: RolePermisson, unique: false }, foreignKey: 'role_id', as: 'roles'})
