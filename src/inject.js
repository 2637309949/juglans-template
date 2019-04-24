/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2019-01-12 10:26:32
 * @modify date 2019-01-12 10:26:32
 * @desc [简单的后台任务scheduleJob, 复杂的任务管理推荐[http://www.xuxueli.com/xxl-job/#/?id=_35-glue%E6%A8%A1%E5%BC%8Fnodejs]]
 */

const schedule = require('node-schedule')
const moment = require('moment')
const mongoose = require('./addition').mongoose
const { TASK_ENV } = process.env

// 任务实例建议单独部署
const scheduleJob = schedule.scheduleJob
schedule.scheduleJob = async function ({ path, name, spec, callback }) {
  const Task = mongoose.model('Task')
  if (TASK_ENV) {
    const task = {
      path,
      spec,
      name,
      enable: true,
      _creator: 'system',
      _created: moment().unix()
    }
    const doc = await Task.findOne({ name: task.name })
    if (!doc) {
      await Task.create([task])
    }
    // 调度任务
    let job = scheduleJob(task.spec, async function () {
      const doc = await Task.findOne({ name })
      if (doc && doc.enable) {
        if (task.spec === doc.spec) {
          console.info(`Task ${name} schedule.`)
          await callback()
        } else {
          task.spec = doc.spec
          job.reschedule(doc.spec)
          console.info(`Task ${name} reschedule.`)
        }
      } else {
        console.info(`Task ${name} has been forbidden.`)
      }
    })
  }
}

module.exports = {
  test: 'test',
  schedule
}