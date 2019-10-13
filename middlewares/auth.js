const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
/**
 * 中间件，验证token
 */
class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8 // 类变量
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() { // 属性
        return async (ctx, next) => {
            // token检测
            const userToken = basicAuth(ctx.req) // koa封装nodejs的request
            let errMsg = 'token不合法'
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                // 验证token
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (e) {
                // token不合法，已过期
                if (e.name === 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }

            if (decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope // 权限级别
            }

            await next() // 触发后续中间件加载
        }
    }
}

module.exports = {
    Auth
}
