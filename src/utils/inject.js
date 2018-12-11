const schedule = require('node-schedule')
const moment = require('moment')
const Juglans = require('../juglans')

const mongoose = Juglans.mongoose
const { taskEnv, NODE_ENV = 'local' } = process.env

// 任务实例建议单独部署
const scheduleJob = schedule.scheduleJob
schedule.scheduleJob = async function ({ path, name, spec, callback }) {
  const Task = mongoose.model('Task')
  if (taskEnv === NODE_ENV) {
    // 新增或更新
    const entity = {
      path,
      spec,
      name,
      enable: true,
      _creator: 'system',
      _created: moment().unix()
    }
    await Task.updateOne({ name }, { $set: entity }, { upsert: true })
    // 调度任务
    scheduleJob(entity.spec, async function () {
      const task = await Task.findOne({ name })
      if (task && task.enable) {
        // 新增或更新
        entity.spec = task.spec
        return callback()
      } else {
        console.info(`Task ${name} has been forbidden!`)
      }
    })
  }
}

module.exports = {
  test: 'test',
  schedule
}
