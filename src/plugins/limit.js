// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Limit = require('../../../juglans-limit/dist/application')
const { redis } = require('../addition')

module.exports = Limit({
  frequency: {
    model: Limit.model.RedisModel({ redis }),
    passages: [/public\/*/],
    rules: [{
      methods: ['GET'],
      match: /api\/v1\/user*/,
      // every 10s can req /10
      rate: 5
    }],
    async failureHandler (ctx) {
      ctx.status = 500
      ctx.body = {
        message: 'Rate Limited access, Pease Check Again Later!!!'
      }
    }
  }
})
