const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/latest', (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body
    ctx.body = {
        key: 'book'
    }
})

module.exports = router