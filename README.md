# nodejs-demo-jiudao
慕课网，nodejs课程koa2框架学习

慕课课程： Node.js+KOA2 从0到1打造超好用Web框架
一步到位 掌握KOA2服务端开发

#### 项目问题
1. 个人习惯问题，因为有些地方觉得另外的方式更好就没有按照课程中的写法来，项目中仍然保留了部分测试代码，即一个问题多种解决方案，可替代方案进行了注释，所以项目中代码部分地方用法不一致。如全局异常处理和导入异常处理方式等。
2. 课程中，面向对象和面向方法编程方式做了很多的对比，其中classsic.js中存在两种编程方式，可以做对比，此处面向对象的例子不太典型，但是讲解了面向对象的js写法。
3. 课程中有同一个问题不同的解决方案，因为是学习项目所以所有方案都在代码中，看起来会有点混乱，待整理。

#### 项目结构
```
├── app                      项目业务代码
|   ├── api                  项目接口
|   |   ├── v1               v1版本接口
|   |   |   ├── book.js      book相关的api
|   |   |   ├── classic.js   classic相关的api
|   |   |   ├── like.js      like相关的api
|   |   |   ├── token.js     token相关的api
|   |   |   └── user.js      user相关的api
|   ├── lib              
|   |   └── enum.js          仿枚举类型数据
|   └── models               数据模型，和mysql中的数据表一一对应
|   |   ├── art.js           art数据模型
|   |   ├── book-comment.js  bookComment数据模型
|   |   ├── book.js          book数据模型
|   |   ├── classic.js       classic数据模型
|   |   ├── favor.js         favor数据模型
|   |   ├── flow.js          flow数据模型
|   |   ├── hot-book.js      hotBook数据模型
|   |   └── user.js          user数据模型
|   ├── services             业务逻辑  
|   |   └── wx.js            与微信相关的业务代码
|   └── validators           数据校验  
|       └── validator.js     表单数据校验
├── config                   配置  
|   └── config.js            配置文件
├── core                     公用
|   ├── db.js                数据库链接，数据表全局配置
|   ├── http-exception.js    错误异常处理
|   ├── init.js              项目初始化代码  
|   ├── lin-validator-v2.js  数据校验基类
|   └── util.js              工具类 
├── middlewares              中间件
|   ├── auth.js              接口权限验证
|   └── exception.js         接口异常处理
├── node_modules           
├── static                   静态资源目录
├── test                     koa入门学习测试代码
├── app.js                   项目入口
└── package.json             项目的package配置
```

#### 项目搭建

```shell
npm init // 初始化项目目录
npm i koa // 安装koa框架
npm i nodemon -g // 动态编译

// 启动项目
nodemon app.js
```

#### 项目模块

1. `koa-bodyparser`: 简化获取post数据流程
2. `koa-router`: 路由导航、动态路由及其获取参数
3. `sequelize`: ORM(对象关系映射)
4. `mysql2`: 数据库连接插件
5. `basic-auth`、`jsonwebtoken`: token令牌
6. `validator`: 参数验证
7. `require-directory`: 路由自动加载
8. `npm-check`: 检查依赖包是否有更新、错误以及不在使用的
9. `module-alias`: 别名配置
10. `bcryptjs`: 加密解密
11. `lodash`: 工具库
12. `axios`: 发送请求
13. `koa-static`: 访问静态资源

#### 项目学习

1. 如果第一次接触koa2框架，可以先试运行test目录下的文件，初步了解框架运行机制。
2. 其他文件是项目实战中的文件，后端项目对应的前端项目是`wechat-applet-demo-jiudao`，对该前端项目做了适配，但是数据库中的图片数据不是项目中的静态资源，而是旧岛小程序课程中的图片链接。



#### 课堂笔记

1. 常用框架：`egg.js`框架、`think.js`框架、`koa.js`框架（`koa`： 越精简，定制化能力越强）、`express.js`框架

2. 数据库效率：悲观锁，乐观锁，脏读，幻读，事务

3. `nodejs`：高并发，异步，对CPU性能依赖性低

4. 文件导入方式：`commonJS`使用`require`方式导入`module.exports`方式导出，`ES6`的方式为`import`的方式导入，`AMD`方式

5. es6语法，TC39

6. 函数返回`promise`，就可以使用`async`和`await`简化链式

   `await`可以对表达式求值，会阻塞当前线程， `async`关键字声明的函数最终会返回一个`promise`，`async`会告诉线程执行到当前函数时可以不用等待当前函数直接执行下一个函数，多线程。

7. `restful`的`api`携带版本号，携带策略：路径，查询参数，`header`

8. npx调用当前项目安装的包

9. 异常处理

10. AOP面向切面编程

11. 一般定义状态都是用状态码，前端用状态码判断不容易出错，虽然相对于可读性没有字符串好

12. js一般的编程规范是使用驼峰的方式进行

13. windows：启动mysql服务`net start mysql` 关闭mysql服务`net stop mysql`

    linux： 启动MySQL服务`service mysql start`，关闭mysql服务`service mysql stop`，重启服务`service restart stop`，`service mysqld status`查看状态

14. 一般导入npm的包放在第一位

15. 加密信息: 用户保存密码一般不能使用明文存储,并且相同的密码存储的密码不能一致,避免彩虹攻击.
    推荐阅读: how boryptjs works

    token：jwt令牌,携带数据,一般会把uid放到令牌中，权限分级使用scope参数

16. 小程序中不会改变的数据可以缓存，动态更新可能会实时改变的部分。前端缓存是解决性能问题最有效的方案。

17. js在es5中object的key都是字符串用引号或方括号表示，方括号中的key可以是表达式。

18. 重构：有三处及以上的代码重复可以进行提取复用。静态的方法是面向过程的方式，class实例的方法是面向对象的方式。

19. 并发与并行：并行是多个线程同时进行，并发（应对宏任务和微任务的手段）

20. CPU密集型和资源密集型

21. 程序：前端、后端（数据整合）、服务端、docker

22. `JSON`序列化：js对象中定义了toJSON方法，则使用JSON.stringify(obj)是由toJSON中return决定的。
    排除不需要的字段序列化方法：

23. 静态资源：model模型中的dataValues是不受get影响的，保存的是数据取出的原始数据。toJOSN序列化时传递给前端的数据时dataValues中的数据。

24. nuxt ssr

25. 进程模型：

    同步异步：过程，有无消息通知，调用方是被动主动

    异步IO

    阻塞非阻塞：状态

    事件循环与事件驱动

    单线程

    进程

    子进程

    启动子进程

    进程间通信

    1. 同步阻塞：当一个进程正在使用需要等待当前进程处理完成后进行处理下一个进程，并且此时下一个进程进入等待队列
    2. 同步非阻塞：当一个进程正在处理，下一个进程定时监听当前线程是否已执行完毕，未执行完毕时，可以去做其他事情，当监听到执行完毕后进行执行下一个进程。
    3. 异步非阻塞：当进程执行完毕后通知下一个进程进行执行

    

    mongoDB

    show dbs

    use 数据库

    show tables

##### 项目开发笔记

1. 在项目目录下执行`npm init`

2. 安装koa，在项目目录下执行 `npm i koa`

3. nodejs对es6的语法糖支持程度不高

4. koa会自动执行第一个中间件，但其他中间件需要手动进行执行，使用next()

5. koa洋葱模型：先执行第一个中间件上半部分，执行到next后，执行完next中的第二个中间件或多个，然后再执行第一个中间件下半部分。中间件执行需要加上async和await关键字，才能保证中间件执行完全按照洋葱模型进行。

6. next的调用返回的是一个promise，中间件可以return返回值

7. nodejs中函数process.cwd()打印出绝对路径

8. koa中获取参数方式

   ```javascript
   router.get('/v1/:id/book/latest', (ctx, next) => {
       const path = ctx.params // 从网址中获取携带的参数
       const query = ctx.request.query // post中携带的data
       const headers = ctx.request.header // 获取header中的参数
       const body = ctx.request.body // 
       ctx.body = {
           key: 'book'
       }
   })
   ```

9. lodash库中的对象深拷贝

10. sequelize 连接数据库，配置一些数据库的参数，model模型时尽量避免使用constructor，查询数据库会出现问题

11. 中间件是以静态的方式，会在项目启动时实例化类，因此该类为全局，因此不能挂载属性以防属性发生错乱.如果中间件以函数的方式编写不储存状态就不会出现此类问题.

12. `jsonwebtoken`生成jwt令牌，token一般是有时效性的。HttpBasicAuth身份验证机制

13. `module-alias/register`路径别名，需要在package.json中进行配置

14. `typeorm`

15. `koa-static`，可以直接读取koa框架下static资源

16. `koa-convert`，可以对只支持koa1不支持koa2版本的中间件进行转化

17. `nodemon`插件使用自动监听`nodejs`改变，自动编译，启动`nodemon app`

18. 避免循环引用（导入），两个文件如果相互导入，会有循环导入的bug。解决方案：局部导入避免全局导入。

19. 分页：传统的：pageNum,perPage 新的：start, count

20. 用户无感知刷新token：二次重发机制。refresh_token去刷新access_token同时也延长refresh_token时效，能实现用户的无感知token刷新。

21. 框架设计：业务分层 Model，service

    数据库设计：model code first，创建数据表之前应该先弄清楚业务model，先设计model然后再用sequelize自动创建数据表，由粗到细，初期理论：实体表-》业务表（记录业务解决业务问题），其实归根结底数据表都是实体，保持数据的原子性、一致性和持久性、隔离性（ACID）。操作数据库要具有事务。数据库事务保证数据的一致性。

    数据操作注意点：不要显示传输uid，禁止循环查询数据库（循环查询次数不可控）。图书基础数据做成服务的形式，具有公用性。

22. 部署

    ```
    cd /usr/local/src/
    wget https://nodejs.org/dist/v10.11.0/node-v10.11.0-linux-x64.tar.xz --no-check-certificate // 不校验证书下载
    
    tar -xvf node-v10.11.0-linux-x64.tar.xz     // 解压
    mv node-v10.11.0-linux-x64 node            // 重命名
    ```

    环境变量配置

    在root下`~/.profile`没有则新建

    ```
    # Nodejs
    export PATH=/usr/local/src/node/node/bin:$PATH
    ```

    保存后，刷新.profile

    ```
    source ~/.profile
    或
    . ~/.profile
    ```

    验证

    ```
    node -v
    npm -v
    ```

    lets encrypt 免费https证书

    启动守护进程 pm2

     npm淘宝源

    查看源：npm get registry

    临时换源： npm --registry https://registry.npm.taobao.org install express

    持久换源：npm config set registry https://registry.npm.taobao.org

    promise不是语法糖，是一种规范

