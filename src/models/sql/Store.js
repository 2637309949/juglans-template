// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const base = require('./Base')
const User = require('./User').User
const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

// defineSchema defined store model
const defineSchema = SeqExt.DefineSchema(base, {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Register defined Register store model
const Store = SeqExt.Register({
  schema: defineSchema,
  name: 'store',
  displayName: '店铺',
  autoHook: false,
  opts: {}
})

Store.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
Store.belongsTo(User, {foreignKey: '_modifier', as: 'modifier'})

module.exports = function ({ router, events: e }) {
  // routes: api/v1/mgo/user
  SeqExt.api.List(router, 'store').Pre(async function (ctx) {
    console.log('before')
  }).Post(async function (ctx) {
    console.log('after')
  })
  // routes: api/v1/mgo/feature1/user
  SeqExt.api.Feature('feature1').List(router, 'store')
  // routes: api/v1/mgo/feature1/subFeature1/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').List(router, 'store')
  // routes: api/v1/mgo/custom/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').Name('custom').List(router, 'store')
  SeqExt.api.One(router, 'store')
  SeqExt.api.Delete(router, 'store')
  SeqExt.api.Update(router, 'store')
  SeqExt.api.Create(router, 'store')
}

module.exports.Store = Store
