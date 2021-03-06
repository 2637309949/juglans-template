// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const { SeqExt, Sequelize } = require('../../addition')

const schema = model.Schema({
  param_id: {
    type: Sequelize.INTEGER,
    comment: 'Param外键'
  },
  category: {
    type: Sequelize.STRING,
    comment: '类别'
  },
  sub_category: {
    type: Sequelize.STRING,
    comment: '子类别'
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '属性'
  },
  value: {
    type: Sequelize.STRING,
    comment: '属性值'
  }
})

// Register defined Register store model
SeqExt.Register({
  name: 'Property',
  displayName: '配置子项',
  schema
}, {
  indexes: [
    {
      name: 'category_sub_category',
      fields: ['category', 'sub_category'],
      where: {
        status: 'public'
      }
    }
  ]
})

const Property = SeqExt.Model('Property')
const User = SeqExt.Model('User')

Property.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Property.belongsTo(User, {foreignKey: '_updator', as: 'updator'})
