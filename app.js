const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa() // 实例化， 应用程序对象：包含多种中间件
app.use(parser()) // 中间件，获取接口中的body传参
app.use(catchError)

// 启动koa框架，指定端口号
app.listen(3000)

// 初始化
InitManager.initCore(app)
