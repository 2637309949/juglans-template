
// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const crypto = require('crypto')
const model = require('./Model')
const mgoExt = require('../../addition').mgoExt
const logger = require('../../addition').logger
const mongoose = require('../../addition').mongoose
const Schema = mongoose.Schema

const schema = model.Schema({
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
  salt: {
    type: String,
    displayName: '盐噪点',
    required: '盐噪点({PATH})不能为空'
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
  permissions: [{
    type: Schema.Types.ObjectId,
    displayName: '关联权限',
    ref: 'Permission'
  }],
  roles: [{
    type: Schema.Types.ObjectId,
    displayName: '关联角色',
    ref: 'Role'
  }]
})

// Method to set salt and hash the password for a user
schema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`)
  this.password = hash
}

// Method to check the entered password is correct or not
schema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`)
  return this.password === hash
}

schema.statics.isManager = async (username) => {
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
  schema,
  opts: {
    routeHooks: {
      list: {
        cond: async function (cond, ctx, opts) {
          return cond
        }
      }
    }
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
  // Example Restful Api
  mgoExt.api.Feature('feature1').Feature('subFeature1').Name('custom').List(router, 'User')
  mgoExt.api.One(router, 'User')
  mgoExt.api.Delete(router, 'User')
  mgoExt.api.Update(router, 'User')
  mgoExt.api.Create(router, 'User')
  // Model Api
  router.post('/signup', async ctx => {
    try {
      const User = mgoExt.model('User')
      let newUser = new User(ctx.request.body)
      newUser.setPassword(ctx.request.body.password)
      await newUser.save()
      ctx.body = {
        message: 'User added succesfully.'
      }
    } catch (error) {
      logger.error(error.stack || error.message)
      ctx.body = {
        message: 'Failed to add user.'
      }
    }
  })
}
