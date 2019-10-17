const { sequelize } = require('../../core/db') // db: db2 重命名
const { Sequelize, Model } = require('sequelize')

class Flow extends Model {

}

Flow.init({
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}