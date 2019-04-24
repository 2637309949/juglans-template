const defineSchedule = {
  name: 'Hello',
  spec: '*/60 * * * * *',
  callback: async function () {
    console.log('Hello job!')
  }
}

module.exports = function ({ schedule }) {
  schedule.scheduleJob(defineSchedule)
}
