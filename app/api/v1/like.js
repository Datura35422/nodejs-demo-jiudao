const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/like' // url路由前缀
})
const { LikeValidator } = require('../../validators/validator')
const { Favor } = require('../../models/favor')

router.post('/', new Auth().m, async (ctx) => {
    // 接收参数， email password1 password2
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    }) // alias
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    throw new global.errs.Success()
})

router.post('/cancel', new Auth().m, async (ctx) => {
    // 接收参数， email password1 password2
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    }) // alias
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    throw new global.errs.Success()
})

module.exports = router