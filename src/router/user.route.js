const Router = require('koa-router')
// 验证 规则
const { userValidator,verifyUser,crpytPassword,verifyLogin } = require('../middleware/user.middleware')
// 控制器创建数据库 并返回
const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })
// GET /users/
// router.get('/', (ctx, next) => {
//   ctx.body = 'hello users'
// })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post('/login', userValidator,verifyLogin,login)

module.exports = router