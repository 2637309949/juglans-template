const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

const defineSchema = new mongoose.Schema(Object.assign({}, CommonFields, {
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

module.exports = function ({ router }) {
  mongoose.Register({
    name: 'Task',
    displayName: '任务配置',
    schema: defineSchema
  })
}
