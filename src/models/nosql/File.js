
// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')
const mgoExt = require('../../addition').mgoExt

const schema = model.Schema({
  uid: {
    type: String,
    displayName: '标识'
  },
  name: {
    type: String,
    displayName: '名称'
  },
  type: {
    type: String,
    displayName: '类型'
  },
  status: {
    type: Number,
    displayName: '状态'
  },
  size: {
    type: Number,
    displayName: '大小'
  },
  url: {
    type: String,
    displayName: 'URL'
  },
  path: {
    type: String,
    displayName: '路径'
  }
})

mgoExt.Register({
  name: 'File',
  displayName: '文件资源',
  schema,
  opts: {
    routeHooks: {
      list: {
        cond: async function (cond, ctx, opts) {
          return cond
        }
      }
    }
  }
})
