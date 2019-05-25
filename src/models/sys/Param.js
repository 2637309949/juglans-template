const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

const defineSchema = new mongoose.Schema(Object.assign({}, CommonFields, {
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
    type: mongoose.Schema.Types.Mixed,
    displayName: '参数值'
  }
}))

module.exports = function ({ router }) {
  mongoose.Register({
    name: 'Param',
    displayName: '参数配置',
    schema: defineSchema
  })
}
