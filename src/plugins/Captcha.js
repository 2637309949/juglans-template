const Captcha = require('../../../juglans-captcha')

module.exports = Captcha({
  urlPrefix: '/captcha',
  maxAge: 60000,
  config: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 1,
    color: true,
    background: '#cc9966'
  },
  cipher: {
    key: '5cbd5f603fd886000e3bb75e',
    iv: '5c9dbc4c9699fa000e1e0a98'
  }
})
