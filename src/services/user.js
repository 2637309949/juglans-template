// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const mongoose = require('../addition').mongoose
const logger = require('../addition').logger
const repo = exports

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
