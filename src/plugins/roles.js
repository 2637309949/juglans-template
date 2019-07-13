// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const Roles = require('../../../juglans-roles')

module.exports = Roles({
  roleHandler (ctx, action) {
    // const actions = Roles.transformAction(action)
    // const roles = actions.roles
    // const permits = actions.permits
    return true
  }
})
