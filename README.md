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
```

#### 项目模块

1. `koa-bodyparser`: 简化获取post数据流程
2. `koa-router`: 路由导航、东莞太路由及其获取参数
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
3. 课程笔记待补。。。