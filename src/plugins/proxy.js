
// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Proxy = require('../../../juglans-proxy/dist/application')

module.exports = Proxy({
  host: 'http://www.baidu.com',
  match: /^\/proxy\//,
  map: function (path) { return 'public/' + path }
})
