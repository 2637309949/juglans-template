const superagent = require('supertest')
const pApp = require('../src/app')

module.exports = new Promise((resolve, reject) => {
  console.log('supertest')
  pApp.Run(function ({ httpProxy }) {
    console.log('httpProxy = ', httpProxy)
    resolve(superagent(httpProxy.listen()))
  })
})
