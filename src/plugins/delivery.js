// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Delivery = require('../../../juglans-delivery')
const path = require('path')

module.exports = Delivery({
  urlPrefix: '/public',
  root: path.join(__dirname, '../../assets/public')
})
