const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose
const Schema = mongoose.Schema

const defineSchema = new Schema(Object.assign({}, CommonFields, {
  code: {
    type: String,
    unique: true,
    displayName: '参数编码'
  },
  desc: {
    type: String,
    displayName: '参数描述'
  },
  value: {
    type: Schema.Types.Mixed,
    displayName: '参数值'
  }
}))

mongoose.model('Param', defineSchema)
