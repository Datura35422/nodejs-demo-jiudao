const Koa = require('koa');
const app = new Koa();

// 执行顺序按照use调用顺序，logger -> x-response-time -> response
// 具体代码执行顺序根据await next()来决定

// logger

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('X-Response-Time', `${ms}ms`)
});

// response

app.use(async ctx => {
    ctx.body = 'Hello World';
    console.log('hello world')
});

app.listen(3000);