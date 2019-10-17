const util = require('util')
const axios = require('axios')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('@core/db') // db: db2 重命名
// const { Favor } = require('./favor')

class Book extends Model {
    // constructor(id) { // 查询数据会出现字段不全的bug
    //     super()
    //     this.id = id
    // }

    // async detail() {
    //     const url = util.format(global.config.yushu.detailUrl, this.id)
    //     const detail = await axios.get(url)
    //     return detail.data
    // }

    static async getDetail(id) {
        const url = util.format(global.config.yushu.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async searchFromYushu(q, start, count, summary = 1) { // 返回概要信息
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), start, count, summary)
        const result = await axios.get(url)
        return result.data
    }

    static async getMyFavorBookCount(uid) {
        const { Favor } = require('./favor')
        const count = await Favor.count({
            where: {
                type: 400,
                uid
            }
        })
        return count
    }

    static async getList(books) {

    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}