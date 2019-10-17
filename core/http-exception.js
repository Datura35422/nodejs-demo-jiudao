
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super() // 调用基类构造函数
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.errorCode = errorCode || 10000
        this.msg = msg || '参数错误'
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.errorCode = errorCode || 0
        this.msg = msg || 'success'
    }
}

class HasError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.errorCode = errorCode || 10001
        this.msg = msg || '资源已存在'
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.errorCode = errorCode || 10002
        this.msg = msg || '资源未找到'
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.errorCode = errorCode || 10004
        this.msg = msg || '授权失败'
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.errorCode = errorCode || 10006
        this.msg = msg || '禁止访问'
    }
}

class LikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.errorCode = errorCode || 20001
        this.msg = msg || '你已经点过赞了'
    }
}

class DislikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.errorCode = errorCode || 20002
        this.msg = msg || '你已取消点赞'
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    HasError,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DislikeError
}
