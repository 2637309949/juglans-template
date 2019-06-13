const OpenApi = require('../../../juglans-openapi')

module.exports = OpenApi({
  urlPrefix: '/gateway',
  Auth: function () {
  }
})
