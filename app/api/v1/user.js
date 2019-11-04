const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user' // url路由前缀
})
const { Success } = require('../../../core/http-exception')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
// Koa Context 将 node 的 request 和 response 对象封装到单个对象中，
// 为编写 Web 应用程序和 API 提供了许多有用的方法。
// 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。
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
