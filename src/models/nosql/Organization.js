// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const {
  mongoose,
  mgoExt
} = require('../../addition')
const Schema = mongoose.Schema

const schema = model.Schema({
  name: {
    type: String,
    displayName: '名称'
  },
  code: {
    type: String,
    displayName: '参数编码',
    unique: true
  },
  value: {
    type: Schema.Types.Mixed,
    displayName: '参数值'
  }
})

mgoExt.Register({
  name: 'Org',
  displayName: '组织',
  autoHook: true,
  schema
})
