// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const logger = require('../../addition').logger
const SeqExt = require('../../addition').SeqExt
const User = require('./User').User
const Sequelize = require('../../addition').Sequelize
const EVENTS = require('../../juglans').events

const defineSchema1 = SeqExt.DefineSchema(model, {
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
    unique: true,
    comment: '编码'
  },
  value: {
    type: Sequelize.STRING,
    comment: '属性值'
  },
  param_id: {
    type: Sequelize.INTEGER,
    comment: 'Param外键'
  }
})

// Register defined Register store model
const Property = SeqExt.Register({
  schema: defineSchema1,
  name: 'property',
  displayName: '配置子项'
})

Property.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Property.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

// defineSchema defined store model
const defineSchema2 = SeqExt.DefineSchema(model, {
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

// Register defined Register store model
const Param = SeqExt.Register({
  schema: defineSchema2,
  name: 'param',
  displayName: '参数配置'
})

Param.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Param.belongsTo(User, {foreignKey: '_updator', as: 'updator'})
Param.hasMany(Property, {foreignKey: 'param_id', sourceKey: 'id', as: 'value'})

async function addEnum ({ model, key, value }) {
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
//   await instance.setValue(items)
}

// init defined prepare
async function init () {
  // await sequlize async finish
  await new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve()
    }, 2000)
  })
  // end
  logger.info('Init Param ...')
  await addEnum({ model: 'permission',
    key: 'type',
    value: [{
      key: '一级菜单',
      value: '101',
      _creator: 1,
      _updator: 1
    }, {
      key: '二级菜单',
      value: '102',
      _creator: 1,
      _updator: 1
    }, {
      key: '三级菜单',
      value: '103',
      _creator: 1,
      _updator: 1
    }, {
      key: '按钮',
      value: '104',
      _creator: 1,
      _updator: 1
    }, {
      key: '自定义',
      value: '105',
      _creator: 1,
      _updator: 1
    }] })
  await addEnum({ model: 'role',
    key: 'type',
    value: [{
      key: '管理',
      value: '101',
      _creator: 1,
      _updator: 1
    }, {
      key: '业务',
      value: '102',
      _creator: 1,
      _updator: 1
    }] })
}

module.exports = function ({ router, roles, events }) {
  events.on(EVENTS.SYS_JUGLANS_PLUGINS_HTTPPROXY_LISTEN_SUCCEED, function (message) {
    init()
  })
}

module.exports.Param = Param
module.exports.Property = Property
