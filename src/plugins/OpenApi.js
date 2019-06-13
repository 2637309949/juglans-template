const OpenApi = require('../../../juglans-openapi')

module.exports = OpenApi({
  urlPrefix: '/gateway',
  Auth: function (AppId) {
    return {
      appID: 'xx',
      publicKey: 'xx',
      privateKey: 'xx'
    }
  }
})
