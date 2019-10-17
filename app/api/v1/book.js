const Router = require('koa-router')
const { PositiveIntegerValidator, SearchValidator, AddShortCommentValidator } = require('@validators')
const { Auth } = require('@middlewares/auth')
const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')
const { Favor } = require('@models/favor')
const { BookComment } = require('@models/book-comment')
const router = new Router({
    prefix: '/v1/book' // url路由前缀
})

router.get('/hot_list', new Auth().m, async ctx => {
    const favors = await HotBook.getAll()
    ctx.body = favors
})

router.get('/:id/detail', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    // const book = new Book(v.get('path.id'))
    // ctx.body = await book.detail()
    const book = await Book.getDetail(v.get('path.id'))
    ctx.body = book
})

router.get('/search', new Auth().m, async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYushu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})

router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

router.get('/:book_id/favor', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const favor = await Favor.getBookFavors(ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
})

router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'book_id'
    })
    await BookComment.addComment(v.get('body.book_id'), v.get('body.content'))
    throw new global.errs.Success()
})

router.get('/:book_id/short_comment', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const comment = await BookComment.getComment(parseInt(v.get('path.book_id')))
    ctx.body = {
        comments: comment
    }
})

router.post('/add_list', new Auth().m, async ctx => {
    const body = ctx.request.body
    const list = body.list
    let books = []
    try {
        for (let book = 0; book < list.length; book++) {
            books.push(await HotBook.create({
                ...list[book],
                index: book + 1
            }))
        }
    } catch (e) {
        throw new global.errs.HasError()
    }
    ctx.body = books
})

router.get('/hot_keyword', async ctx => {
    ctx.body = {
        'hot': ['Python', '哈利·波特', '村上春树', '东野圭吾', '韩寒', '金庸', '王小波']
    }
})

module.exports = router