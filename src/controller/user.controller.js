const { createUser, getUerInfo } = require('../service/user.service')
class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        const { user_name, password } = ctx.request.body

        // 2. 操作数据库
        const res = await createUser(user_name, password)
        console.log('数据库返回结果',res)
        // 3.返回结果
        // ctx.body = ctx.request.body
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            },
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        ctx.body = {
            code: 0,
            message: '用户登录成功',
            result: {
                user_name: user_name,
            },
        }
    }
}

module.exports = new UserController()