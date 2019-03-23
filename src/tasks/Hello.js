const defineSchedule = {
  name: 'Hello',
  spec: '*/20 * * * * *',
  callback: async function () {
    console.log('Hello job!')
  }
}

module.exports = function ({ schedule }) {
  schedule.scheduleJob(defineSchedule)
}
