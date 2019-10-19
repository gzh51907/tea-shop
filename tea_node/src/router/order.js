const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { formatData, token } = require('../utils')
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
	for(let i=0;i<result[0].list.length;i++){
		for(let j=0;j<result[0].list[i].main.length;j++){
			for(let x=0;x<result[0].list[i].main[j].smalllist.length;x++){
				num = Math.floor(Math.random()*10000);
				result[0].list[i].main[j].smalllist[x].kucun=String(num)
			}
		}
	}
	res.send(result[0])
	
})
module.exports = Router;