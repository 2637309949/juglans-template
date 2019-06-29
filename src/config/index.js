// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const local = require('./local')
const prod = require('./prod')
const test = require('./test')
const dev = require('./dev')

const { ENV = 'local' } = process.env

module.exports = {
  local,
  prod,
  test,
  dev
}[ENV]

module.exports.ENV = ENV
