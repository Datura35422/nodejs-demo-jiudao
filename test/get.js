const Koa = require('koa')
const app = new Koa()
// 测试 url：http://localhost:3000/page/user?a=1&b=2
app.use(async (ctx) => {
    const address = ctx.req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP 需要nginx配置
                    ctx.req.connection.remoteAddress || // 判断 connection 的远程 IP
                    ctx.socket.remoteAddress // 判断后端的 socket 的 IP socket对象
    console.log(ctx.req.connection)
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
        ctx_querystring,
        address
    }
})

app.listen(3000, () => {
    console.log('[demo] request get is starting at port 3000')
})