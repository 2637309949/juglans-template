// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const path = require('path')
const Upload = require('../../../juglans-upload')

module.exports = Upload({
  prefix: '/upload',
  assetsPrefix: '/public/upload',
  uploadPrefix: path.join(__dirname, '../../assets/public/upload'),
  async save (ctx, ret) {
  }
})
