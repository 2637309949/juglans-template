// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Upload = require('../../../juglans-upload/dist/application')

Upload.strategys = [...Upload.strategys]
module.exports = Upload({
  urlPrefix: '/public/upload',
  saveAnalysis: async ret => {
    console.log(JSON.stringify(ret[0].content))
  },
  findAnalysis: async cond => {
  }
})
