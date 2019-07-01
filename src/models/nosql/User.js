
// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Base = require('./Base')
const mongoose = require('../../addition').mongoose
const mgoExt = require('../../addition').mgoExt

const defineSchema = new mongoose.Schema(mgoExt.DefineSchema(Base, {
  username: {
    type: String,
    displayName: '账号',
    unique: true,
    required: '账号({PATH})不能为空',
    index: true
  },
  password: {
    type: String,
    displayName: '密码',
    required: '密码({PATH})不能为空'
  },
  is_active: {
    type: Boolean,
    displayName: '是否启用',
    default: true
  },
  is_repass: {
    type: Boolean,
    displayName: '是否已修改过密码',
    default: false
  },
  avatar: {
    type: String,
    displayName: '头像'
  },
  type: {
    type: String,
    displayName: '用户类型',
    enum: [null, '企业号', '自建']
  },
  english_name: {
    type: String,
    displayName: '英文名'
  },
  mobile: {
    type: String,
    displayName: '手机'
  },
  email: {
    type: String,
    displayName: '邮箱',
    remark: '冗余设计，同员工档案邮箱'
  },
  roles: [{
    type: String,
    ref: 'Role',
    displayName: '关联角色'
  }],
  locale: {
    type: String,
    displayName: '当前语言',
    remark: '需要切换更新'
  },
  deactive_time: {
    type: Number,
    displayName: '账号被锁定的时间',
    remark: '输错密码登陆超过次数后账号被锁定的时间'
  },
  signin_error_times: {
    type: Number,
    displayName: 'signin错误的次数',
    remark: 'signin错误的次数，比如输错密码'
  }
}))

defineSchema.statics.isManager = async (username) => {
  if (!username) return false
  const User = mongoose.model('User')
  const entity = await User.findOne({ username }, { roles: 1 }).populate('roles', 'roles.type')
  if (entity && Array.isArray(entity.roles) && entity.roles.length > 0) {
    for (const role of entity.roles) {
      if (role && role.type === '管理角色') {
        return true
      }
    }
    return false
  }
  return false
}

const User = mgoExt.Register({
  name: 'User',
  displayName: '参数配置',
  schema: defineSchema,
  autoHook: false
})

module.exports = function ({ router }) {
  // routes: api/v1/mgo/user
  mgoExt.api.List(router, 'User')
    .Pre(async function (ctx) {
      console.log('before')
    })
    .Post(async function (ctx) {
      console.log('after')
    })
  // routes: api/v1/mgo/feature1/user
  mgoExt.api.Feature('feature1').List(router, 'User')
  // routes: api/v1/mgo/feature1/subFeature1/user
  mgoExt.api.Feature('feature1').Feature('subFeature1').List(router, 'User')
  // routes: api/v1/mgo/custom/user
  mgoExt.api.Feature('feature1').Feature('subFeature1').Name('custom').List(router, 'User')

  mgoExt.api.One(router, 'User')
  mgoExt.api.Delete(router, 'User')
  mgoExt.api.Update(router, 'User')
  mgoExt.api.Create(router, 'User')
}
module.exports.User = User
