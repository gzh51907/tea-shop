const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { formatData, token } = require('../utils')


// 查询用户
// Router.get('/aaa', async (req, res) => {
//     let result = await mongo.find('user', { age: '18' })
//     res.send(result)
// })

//注册
// Router.post('/reg', async (req, res) => {
//     let { username, password } = req.body;
// 	let result=await mongo.create('user', [{ username, password, regtime: Date.now() }]);
// 	if (result.length) {
// 	    res.send(formatData({ code: 0 }))
// 	} else {
// 	    res.send(formatData());
// 	}
// })
//修改密码时验证密码对不对
Router.post('/checkadmpass', async (req, res) => {
    let {admname, password } = req.body;
	console.log(admname, password)
    let result = await mongo.find('admin', { admname, password })
	console.log(result.length)
    if (result.length==0) {
        res.send(formatData({ code: 0 }))
    } else {
        res.send(formatData());
    }
})
//登录
Router.post('/login', async (req, res) => {
    let { admname, password } = req.body;
	console.log(admname,password)
    let result = await mongo.find('admin', { admname, password })
    // res.send(result)
	console.log(result.length)
   if (result.length==0) {
   	    res.send(formatData({ code: 0 }))
   	} else {
   	    res.send(formatData());
   	}
})
//查询并返回用户信息
Router.post('/findadm', async (req, res) => {
    let {admname} = req.body;
	console.log(admname)
    let result = await mongo.find('admin', {admname})
    res.send(result)
	console.log(result.length)
})
//修改用户的信息
Router.post('/fixpass', async (req, res) => {
    let {admname,password} = req.body;
	console.log(password)
	let result=await mongo.update('admin',{admname},{password});
	if (result.length==0) {
	    res.send(formatData({ code: 0 }))
	} else {
	    res.send(formatData());
	}
})
module.exports = Router;