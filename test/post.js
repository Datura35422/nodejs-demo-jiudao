const Koa = require('koa')
const app = new Koa()

// 测试url：http://localhost:3000

// 方法一： 原生方法
// app.use(async (ctx) => {

//     if (ctx.url === '/' && ctx.method === 'GET') {
//         // 当GET请求时候返回表单页面
//         let html = `
//       <h1>koa2 request post demo</h1>
//       <form method="POST" action="/">
//         <p>userName</p>
//         <input name="userName" /><br/>
//         <p>nickName</p>
//         <input name="nickName" /><br/>
//         <p>email</p>
//         <input name="email" /><br/>
//         <button type="submit">submit</button>
//       </form>
//     `
//         ctx.body = html
//     } else if (ctx.url === '/' && ctx.method === 'POST') {
//         // 当POST请求的时候，解析POST表单里的数据，并显示出来
//         let postData = await parsePostData(ctx)
//         ctx.body = postData
//     } else {
//         // 其他请求显示404
//         ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
//     }
// })

// // 解析上下文里node原生请求的POST参数
// function parsePostData(ctx) {
//     return new Promise((resolve, reject) => {
//         try {
//             let postdata = "";
//             ctx.req.addListener('data', (data) => {
//                 postdata += data
//             })
//             ctx.req.addListener("end", function () {
//                 let parseData = parseQueryStr(postdata)
//                 resolve(parseData)
//             })
//         } catch (err) {
//             reject(err)
//         }
//     })
// }

// // 将POST请求参数字符串解析成JSON
// function parseQueryStr(queryStr) {
//     let queryData = {}
//     let queryStrList = queryStr.split('&')
//     console.log(queryStrList)
//     for (let [index, queryStr] of queryStrList.entries()) {
//         let itemList = queryStr.split('=')
//         queryData[itemList[0]] = decodeURIComponent(itemList[1])
//     }
//     return queryData
// }


// 方法二： 使用koa-bodyparser中间件
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use(async (ctx) => {

    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时候返回表单页面
        let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body
        ctx.body = postData
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
})

app.listen(3000, () => {
    console.log('[demo] request post is starting at port 3000')
})