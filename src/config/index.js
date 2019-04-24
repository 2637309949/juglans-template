const { NODE_ENV = 'local' } = process.env
const local = require('./local')
const prod = require('./prod')
const test = require('./test')
const dev = require('./dev')

module.exports = {
  local,
  prod,
  test,
  dev
}[NODE_ENV]
module.exports.NODE_ENV = NODE_ENV
