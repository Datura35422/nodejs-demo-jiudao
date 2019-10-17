const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const static = require('koa-static')

require('module-alias/register') // 路径别名

const app = new Koa() // 实例化， 应用程序对象：包含多种中间件
app.use(parser()) // 中间件，获取接口中的body传参
app.use(catchError)
app.use(static(path.join(__dirname, './static'))) // 可以直接访问静态资源 如http://localhost:3000/images/test.jpg

// 启动koa框架，指定端口号
app.listen(3000)

// 初始化
InitManager.initCore(app)
