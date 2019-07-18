
// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const _ = require('lodash')
const Model = require('./Model').Model
const mgoExt = require('../../addition').mgoExt

const defineSchema = mgoExt.DefineSchema(_.assign({
  name: {
    type: String,
    displayName: '账号',
    required: '账号({PATH})不能为空',
    unique: true
  },
  password: {
    type: String,
    displayName: '密码',
    required: '密码({PATH})不能为空'
  },
  birthday: {
    type: Date,
    displayName: '生日'
  },
  mobile: {
    type: String,
    displayName: '手机'
  },
  email: {
    type: String,
    displayName: '邮箱'
  },
  roles: [{
    type: String,
    displayName: '关联角色',
    ref: 'Role'
  }]
}, Model), {})

defineSchema.statics.isManager = async (username) => {
  if (!username) return false
  const User = mgoExt.Model('User')
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

mgoExt.Register({
  name: 'User',
  displayName: '参数配置',
  schema: defineSchema,
  opts: {
    routeHooks: {
      list: {
        cond: async function (cond, ctx, opts) {
          return cond
        }
      }
    }
  },
  autoHook: false
}).Init(async function (ext) {
  const User = mgoExt.Model('User')
  const id = '5d2fe40d7dead1c7924b3dc2'
  let ret = await User.findOne({ name: 'preset' })
  if (ret && `${ret._id}` !== id) {
    await User.remove({ name: 'preset' })
    ret = null
  }
  if (!ret) {
    await User.create([{
      _id: id,
      name: 'preset',
      password: '123456',
      updator: '5d2fe40d7dead1c7924b3dc2',
      deleter: '5d2fe40d7dead1c7924b3dc2'
    }])
  }
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
