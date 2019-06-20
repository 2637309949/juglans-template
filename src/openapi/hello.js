// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const hello = {
  name: 'test.hello',
  version: '1.0',
  voke: function (appKeySecret, puData) {
    return {
      body: {
        'a': 'a',
        'b': 'b'
      }
    }
  }
}

module.exports = ({ openapi }) => {
  openapi.registHandler(hello)
}
