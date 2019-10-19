// 引入模块
const express = require('express');
const fs = require('fs');
// 引入json文件
const { PORT } = require('./config.json');
const allRouter = require('./router');

// 实例化express模块
const app = express();

//静态资源服务器
app.use(express.static('./'));

app.use((req, res) => {
    let content = fs.readFileSync('./index.html');
    res.set('Content-Type', 'text / html', charset = utf - 8);
    res.send(content)
})

app.use(allRouter);

// 监听路由
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})