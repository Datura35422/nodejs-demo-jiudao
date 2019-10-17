const { sequelize } = require('../../core/db') // db: db2 重命名
const { Sequelize, Model } = require('sequelize')

const classicFields = {
    id: { // 主键，自动增长
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: Sequelize.INTEGER(3),
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: {
        type: Sequelize.STRING,
        // get(val) {
        //     return global.config.host + this.getDataValue('image')
        // }
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    pubdate: Sequelize.DATEONLY,
}

class Movie extends Model {

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model {

}

Music.init({
    ...classicFields,
    url: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Music,
    Sentence
}