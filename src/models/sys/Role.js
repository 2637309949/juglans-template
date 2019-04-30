const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

mongoose.model('Role', new mongoose.Schema(Object.assign({}, CommonFields, {
  name_sc: {
    type: String,
    displayName: '角色名称',
    unique: true,
    required: '预警名称({PATH})不能为空'
  },
  name_tc: {
    type: String,
    displayName: '繁体名称'
  },
  name_en: {
    type: String,
    displayName: '英文名称'
  },
  type: {
    type: String,
    displayName: '角色类型',
    enum: [null, '管理角色', '业务角色'],
    default: '业务角色'
  },
  permissions: [{
    type: String,
    ref: 'Permission',
    displayName: '权限列表'
  }]
})))

module.exports = function ({ router }) {
  const rPath = '/Role'
  router.get(rPath, mongoose.hooks.list('Role'))
  router.post(rPath, mongoose.hooks.create('Role'))
  router.delete(rPath, mongoose.hooks.softDelMany('Role'))
}
