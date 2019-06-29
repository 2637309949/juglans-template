// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const base = require('./Base')
const SeqExt = require('../../addition').SeqExt
const User = require('./User').User
const Sequelize = require('../../addition').Sequelize

// defineSchema defined store model
const defineSchema = SeqExt.DefineSchema(base, {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '权限编码'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '权限名称'
  },
  pid: {
    type: Sequelize.INTEGER,
    comment: '父级ID'
  },
  type: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    comment: '权限类别: 一级菜单, 二级菜单, 三级菜单, 按钮, 自定义',
    defaultValue: '5'
  },
  holder: {
    type: Sequelize.ENUM('1', '2'),
    comment: '持有者类别: 系统, 用户',
    defaultValue: '2'
  }
})

// Register defined Register store model
const Permission = SeqExt.Register({
  schema: defineSchema,
  name: 'permission',
  displayName: '权限'
})

Permission.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Permission.belongsTo(User, {foreignKey: '_modifier', as: 'modifier'})

module.exports.Permission = Permission
