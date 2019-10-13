const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user' // url路由前缀
})
const { ParameterException, Success } = require('../../../core/http-exception')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

router.post('/register', async (ctx) => {
    // 接收参数， email password1 password2
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    const r = await User.create(user)
    throw new Success(r)
})

module.exports = router
