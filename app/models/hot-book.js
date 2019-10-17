const { sequelize } = require('../../core/db') // db: db2 重命名
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('@models/favor')

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.scope('bh').findAll({
            order: [
                'index'
            ]
        })
        const ids = []
        books.forEach(book => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids
                },
                type: 400
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']] // attributes为查询结果所包含的字段，fn为帮助函数
        })
        // 待优化
        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })
        return books
    }

    static _getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (book.id === favor.art_id) {
                count = favor.get('count')
            }
        })
        book.setDataValue('fav_nums', count)
    }
}

HotBook.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    index: Sequelize.INTEGER, // 排序
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING,
    status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    }
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}