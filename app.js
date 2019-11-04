const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception') // 错误处理中间件
const static = require('koa-static')

require('module-alias/register') // 路径别名

const app = new Koa() // 实例化， 应用程序对象：包含多种中间件

// koa会自动执行第一个中间件，但其他中间件需要手动进行执行，使用next()
// next的调用返回的是一个promise，中间件可以return返回值
app.use(parser()) // 中间件，获取接口中的body传参
app.use(catchError)
app.use(static(path.join(__dirname, './static'))) // 可以直接访问静态资源 如http://localhost:3000/images/test.jpg

// 启动koa框架，指定端口号
app.listen(3000)
// 上面代码是下面代码的语法糖，因此可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址
// const http = require('http');
// const Koa = require('koa');
// const app = new Koa();
// http.createServer(app.callback()).listen(3000);

// 初始化
InitManager.initCore(app)
