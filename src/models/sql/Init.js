// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const events = require('../../juglans').events
const SeqExt = require('../../addition').SeqExt

// Initdb defined model associating
function Initdb () {
// test model insert
  SeqExt.sequelize.transaction(function (t) {
    var options = { raw: true, transaction: t }
    return SeqExt.sequelize
      .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
      .then(async function () {
        await SeqExt.sequelize.query('DROP TABLE IF EXISTS `users`', null, options)
        await SeqExt.sequelize.query('DROP TABLE IF EXISTS `stores`', null, options)
        await SeqExt.sequelize.query('DROP TABLE IF EXISTS `permissions`', null, options)
        await SeqExt.sequelize.query('DROP TABLE IF EXISTS `roles`', null, options)
      })
      .then(async function () {
        await SeqExt.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
  }).then(async function () {
    // 1. create user table
    await SeqExt.Model('user').sync({ force: true }).then(() => {
      return SeqExt.Model('user').create({
        name: 'John',
        age: 23
      })
    })
    // 2. create store table
    await SeqExt.Model('store').sync({ force: true }).then(() => {
      return SeqExt.Model('store').create({
        name: 'John',
        _creator: 1,
        _updator: 1,
        address: 'gz tianhe'
      })
    })
    // 3. create permission, role, role_permission table
    await SeqExt.Model('permission').sync({ force: true })
    await SeqExt.Model('role').sync({ force: true })
    await SeqExt.Model('role_permission').sync({ force: true })
    const permissionId = await SeqExt.Model('permission').create({
      code: 'XDF09E3',
      name: '财务财年统计',
      _creator: 1,
      _updator: 1,
      type: '5',
      holder: '2'
    })
    const roleId = await SeqExt.Model('role').create({
      name: '财务部',
      _creator: 1,
      _updator: 1,
      type: '2'
    })
    await SeqExt.Model('role_permission').create({
      _permission: roleId.id,
      _role: permissionId.id
    })
  })
}

module.exports = ({ events: e }) => {
  e.on(events.SYS_JUGLANS_SCAN_AFTER, Initdb)
}
