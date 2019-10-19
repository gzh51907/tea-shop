const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { formatData, token } = require('../utils')
var ObjectId = require('mongodb').ObjectId;

//存给客户的消息
Router.post('/setmsg', async (req, res) => {
    let { username, msg } = req.body;
	let result=await mongo.create('msg', [{ username, msg, regtime: Date.now() }]);
	if (result.length) {
	    res.send(formatData({ code: 0 }))
	} else {
	    res.send(formatData());
	}
})
// //查询并返回订单信息
Router.post('/findorder', async (req, res) => {
    let {username,_id} = req.body;
	// console.log(username,_id)

	  try {
	       	let result=await mongo.find('order',{"_id":ObjectId(String(_id)),username});
	        res.send(formatData({data:result}));
	    }
	    catch (err) {
	         res.send(formatData({ code: 0 }))
	    }
})
// //修改订单状态
Router.post('/fixstate', async (req, res) => {
    let {state,_id} = req.body;
	console.log(state,_id)
	let result=await mongo.update('order',{"_id":ObjectId(String(_id))},{state});
	if (result.length==0) {
	    res.send(formatData({ code: 0 }))
	} else {
	    res.send(formatData());
	}
})
module.exports = Router;