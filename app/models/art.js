const { Op } = require('sequelize')
// const { flatten } = require('lodash')
const { Movie, Music, Sentence } = require('./classic')
const { Book } = require('./book')

class Art {

    constructor(art_id, type) {
        this.art_id = art_id
        this.type = type
    }

    async getDetail(uid) { // Method, 实例类之后才能调用该方法
        const { Favor } = require('./favor')
        const art = await Art.getData(this.art_id, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }
        const likeStatus = await Favor.isLike(this.art_id, this.type, uid)
        return {
            art,
            like_status: likeStatus
        }
    }
    // 静态方法，可以不用实例类之后调用，实例类之后不能调用静态方法
    static async getList(artInfoList) {
        // TODO mysql union改写
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        let arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }
            arts = arts.concat(await Art._getListByType(ids, parseInt(key)))
            // arts.push(await Art._getListByType(ids, parseInt(key)))
        }
        return arts
        // return flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        switch (type) {
            case 100:
                arts = await Movie.scope('bh').findAll(finder)
                break
            case 200:
                arts = await Music.scope('bh').findAll(finder)
                break
            case 300:
                arts = await Sentence.scope('bh').findAll(finder)
                break
            default:
                break
        }
        return arts
    }

    static async getData(art_id, type, userScope = true) {
        const finder = {
            where: {
                id: art_id
            }
        }
        let art = null
        const scope = userScope ? 'bh' : null
        switch (type) {
            case 100:
                art = await Movie.scope(scope).findOne(finder)
                break
            case 200:
                art = await Music.scope(scope).findOne(finder)
                break
            case 300:
                art = await Sentence.scope(scope).findOne(finder)
                break
            case 400:
                art = await Book.scope(scope).findOne(finder)
                if (!art) {
                    art = await Book.create({
                        id: art_id
                    })
                }
                break
            default:
                break
        }
        // if (art && art.image) { // 如果image存的相对位置，返回给前端需要拼接成绝对路径
        //     let imgUrl = art.dataValues.image
        //     art.dataValues.image = global.config.host + imgUrl
        // }
        return art
    }
}

module.exports = {
    Art
}