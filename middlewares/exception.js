const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // HTTP status code 2xx, 4xx, 5xx
        // 自定义错误信息：
        // message：具体错误信息，
        // error_code 详细开发者自定义，一般五位
        // request_url：当前访问出错链接
        // ctx.body = '网络错误'

        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'

        if (!isHttpException && isDev) {
            throw error
        }

        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request_url: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else { // 未知异常
            ctx.body = {
                msg: '服务器未知异常',
                error_code: 999,
                request_url: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError
