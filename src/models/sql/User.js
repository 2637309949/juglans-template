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
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '名称'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码'
  },
  age: {
    type: Sequelize.INTEGER,
    comment: '年龄'
  },
  birthday: {
    type: Sequelize.DATE,
    comment: '出生日期'
  },
  mobile: {
    type: Sequelize.STRING,
    comment: '手机号码'
  },
  email: {
    type: Sequelize.STRING,
    comment: '邮件'
  }
})

// Register defined Register user model
SeqExt.Register({
  name: 'User',
  displayName: '用户',
  autoHook: false,
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

const User = SeqExt.Model('User')
User.belongsTo(User, {foreignKey: '_creator', as: 'creator'})
User.belongsTo(User, {foreignKey: '_updator', as: 'updator'})

module.exports = ({ router, events }) => {
  // routes: api/v1/mgo/user
  SeqExt.api.List(router, 'User')
    .Post(async function (ctx) {
      logger.info('User model post hook')
    })
    .Auth(ctx => true)
    .RouteHooks({
      list: {
        cond: function (cond, ctx, info) {
          return cond
        }
      }
    })
  // routes: api/v1/mgo/feature1/user
  SeqExt.api.Feature('feature1').List(router, 'User')
  // routes: api/v1/mgo/feature1/subFeature1/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').List(router, 'User')
  // routes: api/v1/mgo/custom/user
  SeqExt.api.Feature('feature1').Feature('subFeature1').Name('custom').List(router, 'User')
  SeqExt.api.One(router, 'User')
  SeqExt.api.Delete(router, 'User')
  SeqExt.api.Update(router, 'User')
  SeqExt.api.Create(router, 'User')
}
