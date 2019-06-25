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
  SeqExt.api.ALL(router, 'store').Post(async function (ctx) {
    console.log('after')
  }).Auth(ctx => true)
}
