const express = require('express');

const Router = express.Router();
const { formatData } = require('../utils')
const { find } = require('../db/mongo');



Router.get('/check', async (req, res) => {
    let { list_name, list_id } = req.query;
    try {
        let data = await find('listnav',{}, { "id": list_id })
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }


});
//渲染列表数据到列表
Router.get('/', async (req, res) => {
    // let {skip,limit,sort} = req.query;
    let data = await find('listnav', {});
    res.send(formatData({ data }));

})
module.exports = Router;