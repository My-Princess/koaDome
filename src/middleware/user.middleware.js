const bcrypt = require('bcryptjs')
const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userDoesNotExist,
    invalidPassword, userLoginError,userRegisterError } = require('../constant/err.type')
// 注册密码是否为空
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 用户名或密码为空
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}
// 注册用户是否存在
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    try {
        // 必须要使用await 不然查询的时候异步获取不到返回值
        let isUerInfo = await getUerInfo({ user_name })
        // 用户是否存在
        if (isUerInfo) {
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}
// 给注册密码加密
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    // 生成一个加密源
    const salt = bcrypt.genSaltSync(10)
    // hash保存的是 密文
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    // 1. 判断用户是否存在(不存在:报错)
    const { user_name, password } = ctx.request.body

    try {
        const res = await getUerInfo({ user_name })

        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }

        // 2. 密码是否匹配(不匹配: 报错)
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
}