const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager { // 初始化管理器
    static initCore(app) { // 入口总方法
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }

    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/config.js`
        const config = require(configPath)
        global.config = config
    }

    // 自动加载router
    static initLoadRouters() {
        const apiDirctory = `${process.cwd()}/app/api/v1` // 绝对路径
        requireDirectory(module, apiDirctory, {
            visit: whenLoadModule
        }) // 自动导入文件夹目录下的模块
        // 注册, 中间件
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }

    }

    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }

}

module.exports = InitManager