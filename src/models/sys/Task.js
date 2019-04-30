const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

mongoose.model('Task', new mongoose.Schema(Object.assign({}, CommonFields, {
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
})))

module.exports = function ({ router }) {
  const rPath = '/Task'
  router.get(rPath, mongoose.hooks.list('Task'))
  router.post(rPath, mongoose.hooks.create('Task'))
  router.delete(rPath, mongoose.hooks.softDelMany('Task'))
}
