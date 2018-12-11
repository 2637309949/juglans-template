/**
 * @author [Double]
 * @email [example@mail.com]
 * @create date 2018-10-11 21:08:05
 * @modify date 2018-10-11 21:08:05
 * @desc [只保留6个月内的Token, 分析Token]
*/

const defineSchedule = {
  path: __filename,
  name: 'Hello',
  spec: '*/5 * * * * *',
  callback: async function () {
    console.log('Hello job!')
  }
}

module.exports = function ({ schedule }) {
  schedule.scheduleJob(defineSchedule)
}
