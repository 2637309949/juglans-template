const Logs = require('../../../juglans-logs')
const path = require('path')

module.exports = Logs({
  logger: {
    path: path.join(__dirname, '../../logger')
  }
  // use default print format
})
