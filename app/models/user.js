const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db') // db: db2 重命名
const { Sequelize, Model } = require('sequelize')
const { NotFound, AuthFailed } = require('../../core/http-exception')
class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new NotFound('用户不存在')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

User.init({
    id: { // 主键，自动增长
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) { // model的属性操作 设计模式，观察者模式 es6 reflect
            const salt = bcrypt.genSaltSync(10) // 计算机花费生成salt的成本
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})

// 数据迁移

module.exports = {
    User
}
