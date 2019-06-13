module.exports = {
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
