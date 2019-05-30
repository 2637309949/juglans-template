const Upload = require('../../../juglans-upload')

Upload.strategys = [...Upload.strategys]
module.exports = Upload({
  urlPrefix: '/public/upload',
  saveAnalysis: async ret => {
    console.log(JSON.stringify(ret[0].content))
  },
  findAnalysis: async cond => {
  }
})
