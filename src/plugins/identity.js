// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Identity = require('../../../juglans-identity/dist/application')
const { mgoExt, redis } = require('../addition')
const _ = require('lodash')

module.exports = Identity({
  async auth (ctx) {
    const form = _.pick(ctx.request.body, 'username', 'password')
    const User = mgoExt.Model('User')
    // ctx.status.captcha
    const ret = await User.findOne({ username: form.username, password: form.password })
    if (!ret) return null
    return {
      id: ret._id,
      email: ret.email,
      username: ret.username,
      departments: ret.department,
      roles: ret.roles
    }
  },
  fakeTokens: ['DEBUG'],
  fakeUrls: [/\/api\/v1\/upload\/.*$/, /\/api\/v1\/favicon\.ico$/],
  model: Identity.model.RedisModel({ redis })
})
