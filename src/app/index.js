// 将 http 服务和 app 业务拆分
const Koa = require('koa')
//  解析body
const koaBody = require('koa-body')

// 错误状态导入
const errHandler = require('./errHandler')

// 路由
const userRouter = require('../router/user.route')
const app = new Koa()

// 中间件
app.use(koaBody())
app.use(userRouter.routes())
// 统一的错误处理
app.on('error', errHandler)

module.exports = app