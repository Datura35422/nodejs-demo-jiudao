const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
const { dbName, host, port, user, password } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // 需要安装mysql2连接驱动
    host,
    port,
    logging: false, // 日志，sql操作
    timezone: '+08:00', // 北京时区
    define: {
        // created_at, updated_at, deleted_at
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName: true,
        scopes: {
            bh: { // scope 自定义命名
                attributes: {
                    exclude: ['created_at', 'updated_at', 'deleted_at']
                }
            }
        }
    }
})

sequelize.sync({
    force: false
})

Model.prototype.toJSON = function () { // 不要在具体的modle原型链上挂载exclude，在api接口进行序列化
    let data = clone(this.dataValues)
    if (isArray(this.exclude)) {
        this.exclude.forEach(value => {
            unset(data, value)
        })
    }
    return data
}

module.exports = {
    sequelize
}

