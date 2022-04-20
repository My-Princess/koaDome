// 将 http 服务和 app 业务拆分
const Koa = require('koa')
//  解析body
const koaBody = require('koa-body')


// 路由
const userRouter = require('../router/user.route')
const app = new Koa()

// 中间件
app.use(koaBody())
app.use(userRouter.routes())

module.exports = app