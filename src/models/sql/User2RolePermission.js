// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
require('./Role')
require('./User')

const {
  SeqExt,
  Sequelize
} = require('../../addition')

const schema = model.Schema({
  user_id: {
    type: Sequelize.INTEGER
  },
  role_id: {
    type: Sequelize.INTEGER
  },
  permission_id: {
    type: Sequelize.INTEGER
  }
})

// Register defined Register store model
SeqExt.Register({
  name: 'User2RolePermission',
  displayName: '用户与权限角色关系',
  autoHook: false,
  schema
})

const User2RolePermission = SeqExt.Model('User2RolePermission')
const Permission = SeqExt.Model('Permission')
const Role = SeqExt.Model('Role')
const User = SeqExt.Model('User')

User2RolePermission.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
User2RolePermission.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

// many2many
User.belongsToMany(Permission, {through: { model: User2RolePermission, unique: false }, foreignKey: 'user_id', as: 'permissions'})
Permission.belongsToMany(User, {through: { model: User2RolePermission, unique: false }, foreignKey: 'permission_id', as: 'users'})

// many2many
User.belongsToMany(Role, {through: { model: User2RolePermission, unique: false }, foreignKey: 'user_id', as: 'roles'})
Role.belongsToMany(User, {through: { model: User2RolePermission, unique: false }, foreignKey: 'role_id', as: 'roles'})
