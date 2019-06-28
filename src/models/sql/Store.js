// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const CommonFields = require('./common')
const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

const defineSchema = Object.assign({}, {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, CommonFields)

SeqExt.Register({
  name: 'store',
  displayName: '用户',
  schema: defineSchema,
  autoHook: false,
  opts: {}
})

SeqExt.Model('store').sync({ force: true }).then(() => {
  return SeqExt.Model('store').create({
    name: 'John',
    address: 'gz tianhe'
  })
})

module.exports = function ({ router }) {
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
