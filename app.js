// 导入express
const express = require('express')
// 创建服务器实例对象
const app = express()

// 导入并配置cors中间件,解决ajax请求跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件,这个中间件只能解析application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))


// 在路由之前封装res.cc错误处理函数
app.use((req, res, next) => {
    // status默认为1，表示失败的情况
    // err的值可能是一个错误对象，也可能是一个错误的描述字符串,需要判断一下
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 一定要在路由之前配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
// 凡是以/api开头的，都不需要token认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))




// 导入并使用用户路由模块
// 请求地址:http://localhost/api/login 
const userRouter = require('./router/user')
app.use('/api', userRouter)



// 导入并使用data路由模块
// 请求地址:http://localhost/data/test 等
const dataRouter = require('./router/data')
app.use('/data', dataRouter)















// 定义错误级别的中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获token份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
})

// 启动服务器
app.listen(80, () => {
    console.log('启动成功,端口:80');
})