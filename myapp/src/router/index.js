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


//实例化router并配置参数
let router = new VueRouter({
    //配置参数，不同的URL路径显示不同内容
    routes: [
        //首页
        {
            name: 'home',
            path: '/home',
            component: home
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
            //给cart页面设置权限，没有登录的不能进去
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'mine',
            path: '/mine',
            component: mine,
            //给mine页面设置权限，没有登录的不能进去
            meta: {
                requiresAuth: true
            }
        },
        //动态路由，根据商品得id进入商品得详情页
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

            path: '*',
            redirect: '/404'

        }
    ],



});

//全局路由守卫，即每一个路由都要经过
router.beforeEach(function (to, from, next) {

    //在全局路由守卫beforeEach中进行页面权限访问控制
    //先判断目标路由是否需要鉴权
    if (to.meta.requiresAuth) {
        //如需鉴权，则先拿到保存在localStrorage里面的信息，然后再判断
        let Authorization = localStorage.getItem("Authorization");
        if (Authorization) {
            next();

        } else {
            router.push({
                path: '/login',
                query: {
                    targetUrl: to.fullpath
                }
            })
        }
    } else {
        next();
    }
});

//同样是全局路由守卫，不过这个是执行完之后的守卫，所以不用next
router.afterEach(function () {});

//导出VueRouter
export default router;