const defineSchedule = {
  name: 'Hello',
  spec: '*/60 * * * * *',
  job: async function () {
    console.log('Hello job!')
  }
}

module.exports = function ({ schedule }) {
  schedule.scheduleJob(defineSchedule)
}
