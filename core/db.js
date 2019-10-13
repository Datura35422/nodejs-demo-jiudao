const Sequelize = require('sequelize')

const { dbName, host, port, user, password } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // 需要安装mysql2连接驱动
    host,
    port,
    logging: true, // sql操作
    timezone: '+08:00', // 北京时区
    define: {
        // create_time, update_time, delete_time
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true
    }
})

sequelize.sync({
    force: false
})

module.exports = {
    sequelize
}

