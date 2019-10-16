const express = require('express');
const Router = express.Router();
const { formatData, token } = require('../utils')

Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else {
        next();
    }
})

//引入每个模块路由
const userRouter = require('./user');
const admRouter = require('./adm');
const request = require('request');
const listRouter = require('./list');
Router.use(express.urlencoded());
Router.use('/user', userRouter);
Router.use('/adm', admRouter);
Router.use('/list', listRouter);

Router.get('/verify', (req, res) => {
    let Authorization = req.get('Authorization');
    // 校验token有效性
    let result = token.verify(Authorization);
    res.send(formatData({ code: result ? 1 : 0 }))
});

Router.get('/huatian', (req, res) => {
    // request('https://www.nanshig.com/mobile/index.php',
    request('https://www.htxq.net/firstPage/openHomePage.do',
        (error, response, body) => {
            // console.log(body)
            // body = JSON.parse(body);
            console.log(body)
            res.send(body)

        })
});






module.exports = Router;
