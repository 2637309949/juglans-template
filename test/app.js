const superagent = require('supertest')
const pApp = require('../src/app')

module.exports = new Promise((resolve, reject) => {
  pApp.Run(function ({ httpProxy }) {
    resolve(superagent(httpProxy.listen()))
  })
})
