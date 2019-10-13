const util = require('util') // nodejs中自带的帮助工具
const axios = require('axios')
const { User } = require('../models/user')
const { Auth } = require('../../middlewares/auth')
const { generateToken } = require('../../core/util')

class WXManager {
    static  async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        if (errcode !== 0) {
            throw new global.errs.AuthFailed( result.data.errmsg + errcode )
        }

        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}
