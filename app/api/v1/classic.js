const Router = require('koa-router')
const { PositiveIntegerValidator, LikeValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const { Flow } = require('../../models/flow')
const { Movie, Music, Sentence } = require('../../models/classic')
const router = new Router({
    prefix: '/v1/classic' // url路由前缀
})
// 使用Auth中间件进行验证token，注意洋葱模型
router.get('/latest', new Auth().m, async (ctx) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    const status = await Favor.isLike(flow.art_id, flow.type, ctx.auth.uid)
    // sequelize设置datavalue序列化 对象成json 此时的art是class
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', status)
    ctx.body = art
})

router.get('/:index/next', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likeStatus = await Favor.isLike(flow.art_id, flow.type, ctx.auth.uid)
    // sequelize设置datavalue序列化 对象成json 此时的art是class
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeStatus)
    ctx.body = art
})

router.get('/:index/previous', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likeStatus = await Favor.isLike(flow.art_id, flow.type, ctx.auth.uid)
    // sequelize设置datavalue序列化 对象成json 此时的art是class
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeStatus)
    ctx.body = art
})

router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    const favors = await Favor.getMyClassicFavors(uid)
    ctx.body = favors
})

router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    // 方法1：面向对象方式，可复用
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    // 方法2：面向过程方法，静态方式，常用方式，灵活性强
    const art = await Art.getData(id, type)
    if (!art) {
        throw new global.errs.NotFound()
    }
    const likeStatus = await Favor.isLike(id, type, ctx.auth.uid)
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: likeStatus
    }
})

router.post('/add', async (ctx) => {
    const body = ctx.request.body
    const content = {
        type: body.type,
        title: body.title,
        content: body.content,
        image: body.image,
        fav_nums: body.fav_nums,
        pubdate: body.pubdate
    }
    let r;
    switch (body.type) {
        case 100:
            r = await Movie.create(content)
            break
        case 200:
            r = await Music.create(Object.assign({ url: body.url }, content))
            break
        case 300:
            r = await Sentence.create(content)
            break
        default:
            break
    }
    ctx.body = r
})

router.post('/set', async (ctx) => {
    const body = ctx.request.body
    const content = {
        type: body.type,
        index: body.index,
        art_id: body.art_id
    }
    ctx.body = await Flow.create(content)
})

module.exports = router
