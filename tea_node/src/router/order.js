const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { formatData, token } = require('../utils')


// // 查询用户
// Router.get('/aaa', async (req, res) => {
//     let result = await mongo.find('user', { age: '18' })
//     res.send(result)
// })

// //注册
// Router.post('/reg', async (req, res) => {
//     let { username, password } = req.body;
// 	let result=await mongo.create('user', [{ username, password, regtime: Date.now() }]);
// 	if (result.length) {
// 	    res.send(formatData({ code: 0 }))
// 	} else {
// 	    res.send(formatData());
// 	}
// })
// //验证名字重复
// Router.get('/check', async (req, res) => {
//     let { username } = req.query;
//     let result = await mongo.find('user', { username })
//     if (result.length) {
//         res.send(formatData({ code: 0 }))
//     } else {
//         res.send(formatData());
//     }
// })
// //登录
// Router.post('/login', async (req, res) => {
//     let { username, password, mdl } = req.body;
// 	console.log(username,password,mdl)
//     let result = await mongo.find('user', { username, password })
//     // res.send(result)
// 	console.log(result.length)
//     if (result.length) {
//         let Authorization;
//         if (mdl) {
//             Authorization = token.create(username)
//             // Authorization = 789;
//         }
//         res.send(formatData({ data: Authorization }));
//     } else {
//         res.send(formatData({ code: 0 }))
//     }
// })
// //查询订单表信息
Router.post('/findorder', async (req, res) => {
    let {admname} = req.body;
	console.log(admname)
    let result = await mongo.find('order', {admname})
	// result.money=result.num*result.price
	console.log(result)
    res.send(result)
	console.log(result.length)
})
// //修改用户的信息
// Router.post('/fixmsg', async (req, res) => {
//     let {username,obj} = req.body;
// 	// console.log(username,Object.keys(obj))
// 	// password=`$set{${password}}`
// 	let result=await mongo.update('user',{username},obj,true);
// 	if (result.length) {
// 	    res.send(formatData({ code: 0 }))
// 	} else {
// 	    res.send(formatData());
// 	}
// })
//给数据库循环添加id
Router.post('/inset', async (req, res) => {
    let result = await mongo.find('listnav', {}, { "id":"hc" })
	let num=0;
	// result.money=result.num*result.price
	// result[0].list[0].main[0].smalllist[0].id='001'
	// console.log(result[0].list.length)
	// console.log(result[0].list[1].main.length)
	// console.log(result[0].list[1].main[0].smalllist.length)
	for(let i=0;i<result[0].list.length;i++){
		for(let j=0;j<result[0].list[i].main.length;j++){
			for(let x=0;x<result[0].list[i].main[j].smalllist.length;x++){
				// result[0].list[i].main[j].smalllist[x].gid=`${i+1}${j+1}${x+1}`
				num = Math.floor(Math.random()*10000);
				result[0].list[i].main[j].smalllist[x].kucun=String(num)
			}
		}
	}
    // res.send(result[0].list[0].main[0].smalllist[0])
	res.send(result[0])
	
})
module.exports = Router;