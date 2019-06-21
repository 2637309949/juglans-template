// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const mongoose = require('../addition').mongoose
module.exports = Object.assign({
  _creator: {
    type: String,
    displayName: '创建人',
    require: true,
    ref: 'User'
  },
  _modifier: {
    type: String,
    displayName: '修改人',
    ref: 'User'
  }
}, mongoose.ext.CommonFields)
