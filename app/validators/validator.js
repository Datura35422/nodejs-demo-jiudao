const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginType, ClassicType } = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [ // 多个检验规则，规则，提示，详细设置
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '请填写正确的email')
        ]
        this.password1 = [
            // 用户密码不包含危险字符，需要具有一定的难度
            new Rule('isLength', '密码不小于6个字符且不大于32个字符', { min: 6, max: 32 }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不小于4个字符且不大于12个字符', { min: 4, max: 12 })
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须一致') // LinValidator会汇集error然后进行抛出
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({ // sequelize的api
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [ // 多个检验规则，规则，提示，详细设置
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        // web account + secret
        // applet openid
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少六个字符', {
                min: 6,
                max: 128
            })
        ]
        this.validateLoginType = checkType
    }

    // validateLoginType(vals) {
    //     if (!vals.body.type) {
    //         throw new Error('type是必须的')
    //     }
    //     if (!LoginType.isThisType(vals.body.type)) {
    //         throw new Error('type参数不合法')
    //     }
    // }
}

function checkType(vals) {
    if (!vals.body.type) {
        throw new Error('type是必须的')
    }
    if (!LoginType.isThisType(vals.body.type)) {
        throw new Error('type参数不合法')
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        const checker = new Checker(ClassicType)
        this.validateType = checker.checkType.bind(checker)
    }

    // validateLoginType(vals) {
    //     const type = vals.body.type || parseInt(vals.path.type)
    //     if (!type) {
    //         throw new Error('type是必须的')
    //     }
    //     if (!ClassicType.isThisType(type)) {
    //         throw new Error('type参数不合法')
    //     }
    // }
}

class Checker {
    constructor(type) {
        this.checker = type
    }
    checkType(vals) {
        const type = vals.body.type || parseInt(vals.path.type)
        if (!type) {
            throw new Error('type是必须的')
        }
        if (!this.checker.isThisType(type)) { // this指定如果不设置指定类
            throw new Error('type参数不合法')
        }
    }
}

class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', { min: 1, max: 32 })
        ]
        this.start = [
            new Rule('isInt', 'start不符合规范', { min: 0, max: 60000 }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', 'count不符合规范', { min: 1, max: 50 }),
            new Rule('isOptional', '', 20)
        ]
    }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '必须在1到12个字符之间', { min: 1, max: 12 })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    SearchValidator,
    AddShortCommentValidator
}
