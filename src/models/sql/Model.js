// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

// ensure user model hased been inited
require('./User')

const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

module.exports = SeqExt.DefineSchema({
  _creator: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '创建人'
  },
  _updator: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '修改人'
  },
  _deleter: {
    type: Sequelize.INTEGER,
    comment: '删除人'
  }
})
