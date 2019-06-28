// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const CommonFields = require('./common')
const events = require('../../juglans').events
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
  displayName: '店铺',
  schema: defineSchema,
  autoHook: false,
  opts: {}
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci'
})

SeqExt.sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
  .then(function () {
    return SeqExt.Model('store').sync({ force: true }).then(() => {
      return SeqExt.Model('store').create({
        name: 'John',
        _creator: 1,
        _modifier: 1,
        address: 'gz tianhe'
      })
    })
  })
  .then(function () {
    return SeqExt.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true })
  })

function associating () {
  SeqExt.Model('store').belongsTo(SeqExt.Model('user'), {foreignKey: '_creator', as: 'creator'})
  SeqExt.Model('store').belongsTo(SeqExt.Model('user'), {foreignKey: '_modifier', as: 'modifier'})
}

module.exports = function ({ router, events: e }) {
  // associating model
  e.on(events.SYS_JUGLANS_SCAN_AFTER, associating)
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
