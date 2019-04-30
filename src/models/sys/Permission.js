const CommonFields = require('../CommonFields')
const mongoose = require('../../addition').mongoose

mongoose.model('Permission', new mongoose.Schema(Object.assign({}, CommonFields, {
  code: {
    type: String,
    unique: true,
    displayName: '权限编码',
    required: '权限编码({PATH})不能为空'
  },
  name_sc: {
    type: String,
    displayName: '权限名称',
    required: '权限名称({PATH})不能为空'
  },
  name_tc: {
    type: String,
    displayName: '繁体名称'
  },
  name_en: {
    type: String,
    displayName: '英文名称'
  },
  pid: {
    type: String,
    displayName: '上级权限',
    default: null
  },
  type: {
    type: String,
    displayName: '权限类型',
    enum: ['一级菜单', '二级菜单', '三级菜单', '按钮', '自定义'],
    default: '自定义'
  },
  holder: {
    type: String,
    displayName: '权限持有者',
    enum: ['系统', '用户'],
    default: '用户'
  }
})))

module.exports = function ({ router }) {
  const rPath = '/Permission'
  router.get(rPath, mongoose.hooks.list('Permission'))
  router.post(rPath, mongoose.hooks.create('Permission'))
  router.delete(rPath, mongoose.hooks.softDelMany('Permission'))
}
