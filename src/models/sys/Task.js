const Juglans = require('../../juglans')
const CommonFields = require('../CommonFields')
const mongoose = Juglans.mongoose
const Schema = mongoose.Schema

const defineSchema = new Schema(Object.assign({}, CommonFields, {
  spec: {
    type: String,
    displayName: '任务周期',
    required: '任务名称({PATH})不能为空'
  },
  name: {
    type: String,
    displayName: '任务名称',
    unique: true,
    required: '任务名称({PATH})不能为空'
  },
  enable: {
    type: Boolean,
    displayName: '是否激活',
    default: true
  }
}))

mongoose.model('Task', defineSchema)
