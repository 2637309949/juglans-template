const mongoose = require('../addition').mongoose
const logger = require('../addition').logger
const repo = exports

/**
 * 判断用户角色
 */
repo.isManager = async function (username) {
  try {
    const User = mongoose.model('User')
    const isManager = await User.isManager(username)
    return isManager
  } catch (error) {
    logger.error(error.stack)
    throw error
  }
}
