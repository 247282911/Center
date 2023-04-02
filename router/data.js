// 这里只负责定义路由映射关系，处理函数在handler内

// 导入express
const express = require('express')
const router = express.Router()
// 导入data路由处理函数对应的模块
const data_handler = require('../router_handler/data')




router.get('/test0', data_handler.test0)


router.get('/test1', data_handler.test1)


router.get('/test2', data_handler.test2)


router.get('/test_real', data_handler.test_real)

module.exports = router