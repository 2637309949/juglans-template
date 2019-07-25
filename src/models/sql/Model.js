// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const SeqExt = require('../../addition').SeqExt
const Sequelize = require('../../addition').Sequelize

module.exports.Model = {
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '创建时间'
  },
  _creator: {
    type: Sequelize.INTEGER,
    comment: '创建人'
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '更新时间'
  },
  _updator: {
    type: Sequelize.INTEGER,
    comment: '修改人'
  },
  deletedAt: {
    type: Sequelize.DATE,
    comment: '删除时间'
  },
  _deleter: {
    type: Sequelize.INTEGER,
    comment: '删除人'
  }
}

module.exports.withPreset = function (obj) {
  return _.merge(obj, {createdAt: new Date(), updatedAt: new Date()})
}

module.exports.Define = function (schema, opts = {}) {
  return SeqExt.Define(_.assign(schema, module.exports.Model), opts)
}
