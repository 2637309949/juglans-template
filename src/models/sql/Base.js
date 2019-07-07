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
    comment: '创建人',
    references: {
      model: SeqExt.Model('user'),
      key: 'id'
    }
  },
  _modifier: {
    type: Sequelize.INTEGER,
    comment: '修改人',
    references: {
      model: SeqExt.Model('user'),
      key: 'id'
    }
  }
})
