// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Queue = require('../../../juglans-mq')
module.exports = Queue({
  tactics: [
    {
      tactic: {
        interval: 3,
        ctCount: 2
      }
    }
  ]
})
