// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const User = require('./User').User
const Property = require('./Property').Property

const {
  SeqExt, Sequelize
} = require('../../addition')

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

const Param = SeqExt.Register({
  schema: defineSchema,
  name: 'param',
  displayName: '参数配置'
})

Param.addEnum = async function ({ model, key, value }) {
  try {
    const Param = SeqExt.Model('param')
    const Property = SeqExt.Model('property')
    const [instance] = await Param.findOrCreate({
      where: { code: 'enum' },
      defaults: {
        code: 'enum',
        name: '枚举类型',
        _creator: 1,
        _updator: 1
      }
    })
    await Promise.all(value.map(async x => {
      const [i] = await Property.findOrCreate({
        where: { category: 'model', sub_category: key },
        defaults: {
          param_id: instance.id,
          category: model,
          sub_category: key,
          key: x.key,
          value: x.value,
          ...x
        }
      })
      return i
    }))
  } catch (error) {
    console.log('----------', error)
    throw error
  }
}

Param.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Param.belongsTo(User, {foreignKey: '_updator', as: 'updator'})
Param.hasMany(Property, {foreignKey: 'param_id', sourceKey: 'id', as: 'value'})

module.exports.Param = Param
