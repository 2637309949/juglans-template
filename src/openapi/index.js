const hello = require('./hello')

module.exports = ({ openapi }) => {
  openapi.registHandler(hello)
}
