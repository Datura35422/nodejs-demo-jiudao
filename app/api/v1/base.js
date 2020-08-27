const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/base' // url路由前缀
})
// Koa Context 将 node 的 request 和 response 对象封装到单个对象中，
// 为编写 Web 应用程序和 API 提供了许多有用的方法。
// 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。
router.get('/ip', async ctx => {
  const address = ctx.req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP 需要nginx配置
                  ctx.req.connection.remoteAddress || // 判断 connection 的远程 IP
                  ctx.socket.remoteAddress // 判断后端的 socket 的 IP socket对象
  const url = ctx.url
  const params = ctx.params
  // 从上下文的request对象中获取
  const request = ctx.request
  const req_query = request.query
  const req_querystring = request.querystring

  // 从上下文中直接获取
  const ctx_query = ctx.query
  const ctx_querystring = ctx.querystring

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

module.exports = router
