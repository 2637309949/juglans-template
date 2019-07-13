// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Captcha = require('../../../juglans-captcha/dist/application')

module.exports = Captcha({
  urlPrefix: '/captcha',
  config: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 1,
    color: true,
    background: '#cc9966'
  },
  cipher: {
    key: '5cbd5f603fd886000e3bb75e',
    iv: '5c9dbc4c9699fa000e1e0a98'
  }
})
