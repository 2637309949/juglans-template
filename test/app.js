// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const superagent = require('supertest')
const pApp = require('../src/app')

module.exports = new Promise((resolve, reject) => {
  pApp.Run(function ({ httpProxy }) {
    resolve(superagent(httpProxy.listen()))
  })
})
