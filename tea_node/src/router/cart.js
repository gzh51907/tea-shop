const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { formatData, token } = require('../utils')

var ObjectId = require('mongodb').ObjectId;



//查询购物车表，返回完整商品信息
Router.post('/findcart', async (req, res) => {
    let {username} = req.body;
    let result1 = await mongo.find('cart', {username})
	let result = await mongo.find('listnav',{});
	for(let u=0 ; u<result1.length;u++){
		for(let i=0;i<result[0].list.length;i++){
				for(let j=0;j<result[0].list[i].main.length;j++){
					for(let x=0;x<result[0].list[i].main[j].smalllist.length;x++){
						// result[0].list[i].main[j].smalllist[x].gid=`${i+1}${j+1}${x+1}`
						if(result[0].list[i].main[j].smalllist[x].gid==result1[u].gid){
							 result1[u].name=result[0].list[i].main[j].smalllist[x].name;
							  result1[u].imgurl=result[0].list[i].main[j].smalllist[x].photo;
							   result1[u].price=result[0].list[i].main[j].smalllist[x].price;
							    result1[u].check=false;
						}
					}
				}
			}
	}
    res.send(result1)
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
// //加入购物车
Router.post('/addcart', async (req, res) => {
    let {username,gid,qty} = req.body;
	let result='';
	result= await mongo.find('cart', { username, gid });
	if(result.length==0){
		result=await mongo.create('cart', [{ username, gid,qty, regtime: Date.now() }]);
		console.log(result.length)
		// if(result.length==0){
		// 	res.send('succes');
		// }
	}else{
		 qty=result[0].qty*1+1
		result=await mongo.update('cart',{username,gid},{qty},true);
		console.log(result.length)
	}
	res.send('succes');
})
//查询购物车中的库存，返回库存
Router.get('/findkucun', async (req, res) => {
    let {gid ,qty,username} = req.query;
	let kucun=''
	let result = await mongo.find('listnav',{});
		for(let i=0;i<result[0].list.length;i++){
				for(let j=0;j<result[0].list[i].main.length;j++){
					for(let x=0;x<result[0].list[i].main[j].smalllist.length;x++){
						if(result[0].list[i].main[j].smalllist[x].gid==gid){
							if(result[0].list[i].main[j].smalllist[x].gid=gid){
								kucun=result[0].list[i].main[j].smalllist[x].kucun
								// res.send(result[0].list[i].main[j].smalllist[x].kucun)
							}
							 
						}
					}
				}
			}
			if(qty-0 > kucun-0){
				qty=kucun-0
			}else if(qty-0 < 1){
				qty=1
			}
			qty=String(qty)
			await mongo.update('cart',{username,gid},{qty},true);
	res.send(kucun)
})
//删除购物车里的单子
Router.post('/removecart', async (req, res) => {
    let {_id} = req.body;
	// console.log(String(_id[0]))
	 // let result = await mongo.remove('cart',{"_id":ObjectId(String(_id[0]))});
	for(let i= 0; i<_id.length;i++){
		await mongo.remove('cart',{"_id":ObjectId(String(_id[i]))});
	}
	res.send('ok')
})
module.exports = Router;