const app = require('../app')

describe('Test the user path', () => {
  test('It should response array items', (done) => {
    app.then(proxy => {
      proxy
        .get('/api/v1/user?accessToken=DEBUG&size=10')
        .then(function (res) {
          expect(res.statusCode).toBe(200)
          var body = JSON.parse(res.text)
          expect(body.data.length).toBe(0)
          done()
        })
    })
  })
})
