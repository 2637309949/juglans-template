const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

mongoose.model('Param', new mongoose.Schema(Object.assign({}, CommonFields, {
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
})))

module.exports = function ({ router }) {
  const rPath = '/Param'
  router.get(rPath, mongoose.hooks.list('Param'))
  router.post(rPath, mongoose.hooks.create('Param'))
  router.delete(rPath, mongoose.hooks.softDelMany('Param'))
}
