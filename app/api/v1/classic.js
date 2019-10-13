const Router = require('koa-router')
const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/classic' // url路由前缀
})
// 使用Auth中间件进行验证token，注意洋葱模型
router.get('/latest', new Auth().m, async (ctx) => {
    // const v = await new PositiveIntegerValidator().validate(ctx)
    ctx.body = ctx.auth.uid
})

module.exports = router
