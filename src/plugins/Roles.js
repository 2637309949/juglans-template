const Roles = require('../../../juglans-roles')

module.exports = Roles({
  roleHandler (ctx, action) {
    // const actions = Roles.transformAction(action)
    // const roles = actions.roles
    // const permits = actions.permits
    return true
  }
})
