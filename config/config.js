module.exports = {
    environment: 'dev', // prod
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60 * 60 * 24 * 30 // token过期时间
    },
    wx: {
        appId: 'wx80f38683fbccf188',
        appSecret: '399de50ef63b8b6e618cbba66cab98c3',
        // %s占位符
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
