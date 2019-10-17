const { sequelize } = require('../../core/db') // db: db2 重命名
const { Sequelize, Model } = require('sequelize')

class BookComment extends Model {
    static async addComment(bookId, content) {
        const comment = await BookComment.findOne({
            where: {
                book_id: bookId,
                content
            }
        })
        if (!comment) {
            return await BookComment.create({
                book_id: bookId,
                content,
                nums: 1
            })
        } else {
            return await comment.increment('nums', { by: 1 })
        }
    }

    static async getComment(bookId) {
        const comments = await BookComment.scope('bh').findAll({
            where: {
                book_id: bookId
            }
        })
        return comments
    }

    // toJSON() { // 不能传参, json序列化
    //     return {
    //         content: this.getDataValue('content'),
    //         nums: this.getDataValue('nums')
    //     }
    // }
}

BookComment.init({
    book_id: Sequelize.INTEGER,
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize,
    tableName: 'book_comment'
})

module.exports = {
    BookComment
}