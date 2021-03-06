// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const {withPreset} = model
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

// addEnum defined add enum type
schema.statics.addEnum = async function ({ model, key, value }) {
  const Param = mgoExt.Model('Param')
  let one = await Param.findOne({ code: 'enum' })
  if (!one) {
    one = new Param(withPreset({ name: '枚举类型', code: 'enum', value: {} }))
  }
  if (!one.value[model]) {
    one.value[model] = {}
  }
  one.value[model][key] = value
  one.markModified('value')
  await one.save()
}

mgoExt.Register({
  name: 'Param',
  displayName: '参数配置',
  autoHook: true,
  schema
})
