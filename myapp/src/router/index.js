//引入vue
import Vue from 'vue';

//引入vue-router
import VueRouter from 'vue-router';
//使用vue-router
Vue.use(VueRouter);
//引入页面组件
import home from '../pages/home.vue';
import goods from '../pages/goods.vue';
import news from '../pages/news.vue';
import cart from '../pages/cart.vue';
import mine from '../pages/mine.vue';
import list from '../pages/list.vue';
import login from '../pages/login.vue';
import reg from '../pages/reg.vue';
import not from '../pages/not.vue';
import xiang from '../pages/xiang.vue';


//实例化router并配置参数
let router = new VueRouter({
    //配置参数，不同的URL路径显示不同内容
    routes: [
        //首页
        {
            name: 'home',
            path: '/home',
            component: home
        }, {
            path: '/',
            redirect: 'home'
        },
        {
            name: 'list',
            path: '/list',
            component: list
        },
        {
            name: 'news',
            path: '/news',
            component: news
        },
        {
            name: 'cart',
            path: '/cart',
            component: cart,


        },
        {
            name: 'mine',
            path: '/mine',
            component: mine,

        },
        //动态路由，根据商品得id进入商品得详情页
        {
            name: 'xiang',
            path: '/xiang',
            component: xiang,

        },
        {
            name: 'goods',
            path: '/goods',
            component: goods,

        },
        {
            name: 'reg',
            path: '/reg',
            component: reg

        },
        {
            name: 'login',
            path: '/login',
            component: login

        },
        {
            path: '/404',
            component: not
        },
        {
            path: '*',
            redirect: '/404'

        }
    ]
});


//导出VueRouter
export default router;