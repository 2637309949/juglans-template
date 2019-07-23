// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Logs = require('../../../juglans-logs')
const path = require('path')

module.exports = Logs({
  path: path.join(__dirname, '../../logger')
})
