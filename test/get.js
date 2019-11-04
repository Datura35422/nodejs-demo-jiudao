const Koa = require('koa')
const app = new Koa()
// 测试 url：http://localhost:3000/page/user?a=1&b=2
app.use(async (ctx) => {
    let url = ctx.url
    let params = ctx.params
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = { // 返回给前端的数据
        url,
        params,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000, () => {
    console.log('[demo] request get is starting at port 3000')
})