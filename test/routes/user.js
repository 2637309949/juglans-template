// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const app = require('../app')

describe('Test the user path', () => {
  test('It should response array items', (done) => {
    app.then(proxy => {
      proxy
        .get('/api/v1/template/mgo/user?accessToken=DEBUG&size=10')
        .then(function (res) {
          expect(res.statusCode).toBe(200)
          JSON.parse(res.text)
          done()
        })
    })
  })
})
