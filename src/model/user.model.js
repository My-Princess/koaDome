const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const User = seq.define('user', {
    // id 会被sequelize自动创建, 管理
    user_name: {
        // 类型
        type: DataTypes.STRING,
        // 列内是否可以为null
        allowNull: false,
        // 是否唯一
        unique: true,
        // 表名
        comment: '用户名, 唯一',
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码',
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        // 默认值
        defaultValue: 0,
        comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
    },
},{
    // 剔除设计表中创建时间戳和updatedAt
    timestamps:false,
})

// 强制同步数据库(创建数据表) true 如果表已经存在先删除在重新创建
// User.sync({ force: true })

module.exports = User