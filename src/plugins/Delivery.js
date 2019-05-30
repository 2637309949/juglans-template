const Delivery = require('../../../juglans-delivery')
const path = require('path')

module.exports = Delivery({
  urlPrefix: '/public',
  root: path.join(__dirname, '../../assets/public')
})
