// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model').Model
const withPreset = require('./Model').withPreset
require('./User')
require('./Property')

const { SeqExt, Sequelize, logger } = require('../../addition')

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
  }
})

SeqExt.Register({
  schema: defineSchema,
  name: 'Param',
  displayName: '参数配置'
})

const Property = SeqExt.Model('Property')
const Param = SeqExt.Model('Param')
const User = SeqExt.Model('User')

Param.addEnum = async function ({ model, key, value }) {
  try {
    const Param = SeqExt.Model('Param')
    const Property = SeqExt.Model('Property')
    const [instance] = await Param.findOrCreate({
      where: { code: 'enum' },
      defaults: withPreset({
        code: 'enum',
        name: '枚举类型'
      })
    })
    await Promise.all(value.map(async x => {
      const [i] = await Property.findOrCreate({
        where: { category: model, sub_category: key },
        defaults: withPreset({
          param_id: instance.id,
          category: model,
          sub_category: key,
          key: x.key,
          value: x.value,
          ...x
        })
      })
      return i
    }))
  } catch (error) {
    logger.error(error.stack || error.message)
    throw error
  }
}

Param.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Param.belongsTo(User, {foreignKey: '_updator', as: 'updator'})
Param.hasMany(Property, {foreignKey: 'param_id', sourceKey: 'id', as: 'value'})
