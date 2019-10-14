const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

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
    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须的')
        }
        if(!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
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

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator
}
