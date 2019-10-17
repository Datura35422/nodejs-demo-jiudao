const { sequelize } = require('../../core/db') // db: db2 重命名
const { Sequelize, Model, Op } = require('sequelize')
const { Art } = require('./art')
const { Book } = require('./book')

class Favor extends Model {
    static async like(art_id, type, uid) {
        const data = {
            art_id,
            type,
            uid
        }
        // 使用sequelize的事务性
        const favor = await Favor.findOne({
            where: data
        })
        if (favor) {
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t => {
            await Favor.create(data, {
                transaction: t
            })
            const art = await Art.getData(art_id, type, false) // 返回的是具体的模型，因此可以对模型做其他数据操作
            await art.increment('fav_nums', { by: 1, transaction: t }) // fav_nums加一操作
        })
    }

    static async dislike(art_id, type, uid) {
        // 使用sequelize的事务性
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t => {
            await Favor.destroy({
                where: {
                    id: favor.id
                },
                force: true, // 物理删除还是软删除
                transaction: t
            })
            const art = await Art.getData(art_id, type, false) // 返回的是具体的模型，因此可以对模型做其他数据操作
            await art.decrement('fav_nums', { by: 1, transaction: t }) // fav_nums加一操作
        })
    }

    static async isLike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        return Boolean(favor)
    }

    static async getMyClassicFavors(uid) {
        const favors = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!favors) {
            throw new global.errs.NotFound()
        }
        const arts = Art.getList(favors)
        return arts
    }

    static async getBookFavors(uid, bookId) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookId,
                type: 400
            }
        })
        const myFavor = await Favor.findOne({
            where: {
                art_id: bookId,
                uid,
                type: 400
            }
        })
        return {
            fav_nums: favorNums,
            like_status: myFavor ? 1 : 0
        }
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER(3)
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}