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
  name: 'Role2Permission',
  displayName: '权限与角色关系',
  autoHook: false,
  schema
})

const RolePermisson = SeqExt.Model('Role2Permission')
const Permission = SeqExt.Model('Permission')
const User = SeqExt.Model('User')
const Role = SeqExt.Model('Role')

RolePermisson.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
RolePermisson.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

// many2many
Role.belongsToMany(Permission, {through: { model: RolePermisson, unique: false }, foreignKey: 'role_id', as: 'permissions'})
Permission.belongsToMany(Role, {through: { model: RolePermisson, unique: false }, foreignKey: 'permission_id', as: 'roles'})
