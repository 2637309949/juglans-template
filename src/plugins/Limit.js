const Limit = require('../../../juglans-limit')
const { redis } = require('../addition')

module.exports = Limit({
  frequency: {
    model: Limit.model.RedisModel({ redis }),
    passages: [/public\/*/],
    rules: [{
      methods: ['GET'],
      match: /api\/v1\/user*/,
      rate: 1
    }],
    async failureHandler (ctx) {
      ctx.status = 500
      ctx.body = {
        message: 'Rate Limited access, Pease Check Again Later!!!'
      }
    }
  }
})
