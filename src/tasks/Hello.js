// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const logger = require('../addition').logger

const defineSchedule = {
  name: 'Hello',
  corn: '*/50 * * * * *',
  job: async function () {
    logger.info('Hello job!')
  }
}

module.exports = function ({ schedule }) {
  schedule.scheduleJob(defineSchedule.corn, defineSchedule.job)
}
