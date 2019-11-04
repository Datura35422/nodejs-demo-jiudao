const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);

// node test/helloWorld.js
// 运行后在浏览器打开localhost:3000就可以看到结果