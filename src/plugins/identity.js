// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Identity = require('../../../juglans-identity')
const {authOption, modelOption} = Identity.options
const { mgoExt, redis } = require('../addition')
const _ = require('lodash')

module.exports = Identity({
  fakeTokens: [],
  fakeUrls: [/\/api\/upload\/.*$/, /\/api\/favicon\.ico$/, /\/api\/test\/mock\/login/]
}).addOptions(authOption(async function (ctx) {
  const form = _.pick(ctx.request.body, 'username', 'password')
  const User = mgoExt.Model('User')
  // ctx.status.captcha
  const ret = await User.findOne({ username: form.username, password: form.password })
  // custom error reminder
  // if not catch in call func, sys will catch and print with stack
  if (!ret) throw new Error(`the user:${form.username} does not exist or password not match`)
  // use default error reminder
  // if (!ret) return null
  return {
    id: ret._id,
    email: ret.email,
    username: ret.username,
    departments: ret.department,
    roles: ret.roles
  }
}),
modelOption(Identity.model.RedisModel({ redis })))
