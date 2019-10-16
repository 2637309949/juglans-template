// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const model = require('./Model')

const {
  SeqExt,
  Sequelize,
  logger
} = require('../../addition')

const schema = model.Schema({
  uid: {
    type: Sequelize.STRING,
    comment: '标识'
  },
  name: {
    type: Sequelize.STRING,
    comment: '名称'
  },
  type: {
    type: Sequelize.STRING,
    comment: '类型'
  },
  status: {
    type: Sequelize.INTEGER,
    comment: '状态'
  },
  size: {
    type: Sequelize.INTEGER,
    comment: '大小'
  },
  url: {
    type: Sequelize.STRING,
    comment: 'URL'
  },
  path: {
    type: Sequelize.STRING,
    comment: '路径'
  }
})

// Register defined Register user model
SeqExt.Register({
  name: 'File',
  displayName: '文件资源',
  autoHook: true,
  schema,
  opts: {
    routeHooks: {
      list: {
        pre (ctx) {
          logger.info('User model pre hook')
        }
      }
    }
  }
})

const File = SeqExt.Model('File')
File.belongsTo(File, {foreignKey: '_creator', as: 'creator'})
File.belongsTo(File, {foreignKey: '_updator', as: 'updator'})
