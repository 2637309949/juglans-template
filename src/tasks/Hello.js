const defineSchedule = {
  name: 'Hello',
  spec: '*/5 * * * * *',
  callback: async function () {
    console.log('Hello job!')
  }
}

module.exports = function ({ schedule }) {
  schedule.scheduleJob(defineSchedule)
}
