// 导入数据库操作模块
const db = require('../db/index')
// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入存放token密钥的文件
const config = require('../config')

exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo = req.body
    //测试
    console.log(userinfo);
    // 定义sql语句
    const sql = 'select*from users where username=?'
    // 执行sql语句
    db.query(sql, userinfo.username, (err, result) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
        // 获取到数据条数不等于1
        if (result.length !== 1) return res.cc('登陆失败')
        // 判断密码是否正确
        if (userinfo.password !== result[0].password) {
            return res.cc('登陆失败')
        } else {
            // 在服务器端生成Token字符串,并吧password属性给去除掉
            const user = { ...result[0], password: '' }
            // 对用户的信息进行加密，生成token字符串,有效期10h,设置有效期和key在config.js内
            const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            // 调用res.send()将token响应给客户端
            res.send({
                status: 0,
                message: '登陆成功',
                // 在后端直接拼接上Bearer，以方便使用
                token: 'Bearer ' + tokenStr,
                username: userinfo.username
            })
        }
    })

}