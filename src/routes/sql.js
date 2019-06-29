// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const SeqExt = require('../addition').SeqExt

// find many2many
module.exports = function ({ router, reverse }) {
  router.get('/role_permission', async (ctx, next) => {
    const Model = SeqExt.Model('role')
    const list = await Model.findAll({
      where: {},
      include: [
        {
          model: SeqExt.Model('permission'),
          as: 'permissions'
        }
      ]
    })
    ctx.body = list
  })
}
