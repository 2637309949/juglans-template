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
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, CommonFields)

SeqExt.Register({
  name: 'user',
  displayName: '用户',
  schema: defineSchema,
  autoHook: false,
  opts: {}
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci'
})

SeqExt.sequelize
  .query('SET foreign_key_checks = 0;', { raw: true })
  .then(function () {
    return SeqExt.Model('user').sync({ force: true }).then(() => {
      return SeqExt.Model('user').create({
        name: 'John',
        age: 23
      })
    })
  })
  .then(function () {
    return SeqExt.sequelize.query('SET foreign_key_checks = 1;', { raw: true })
  })

module.exports = function ({ router }) {
  // routes: api/v1/mgo/user
  SeqExt.api.List(router, 'user').Pre(async function (ctx) {
    console.log('before')
  }).Post(async function (ctx) {
    console.log('after')
  })
  // routes: api/v1/mgo/feature1/user
  SeqExt.api.Feature('feature1').List(router, 'user')
  // routes: api/v1/mgo/feature1/subFeature1/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').List(router, 'user')
  // routes: api/v1/mgo/custom/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').Name('custom').List(router, 'user')

  SeqExt.api.One(router, 'user')
  SeqExt.api.Delete(router, 'user')
  SeqExt.api.Update(router, 'user')
  SeqExt.api.Create(router, 'user')
}
