// 这里只负责定义路由映射关系，处理函数在handler内

// 导入express
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')



//  登录 
router.post('/login', user_handler.login)



module.exports = router