//引入vue
import Vue from 'vue';

//引入vue-router
import VueRouter from 'vue-router';
//使用vue-router
Vue.use(VueRouter);
//引入页面组件
import login from '../pages/login.vue';
import home from '../pages/home.vue';
import goods from '../pages/goods.vue';
import order from '../pages/order.vue';
import goodshow from '../pages/goodshow.vue';
import goodadd from '../pages/goodadd.vue';
import goodupdate from '../pages/goodupdate.vue';
import gooddel from '../pages/gooddel.vue';
import homefixpass from '../pages/homefixpass.vue';
import homemessage from '../pages/homemessage.vue';
import homeverifypass from '../pages/homeverifypass.vue';
import ordershow from '../pages/ordershow.vue';
import nodeliver from '../pages/nodeliver.vue';

//实例化router并配置参数
let router = new VueRouter({
    //配置参数，不同的URL路径显示不同内容
    routes: [
        //首页
        {
            name: 'home',
            path: '/home',
            component: home,
			meta: {
			    requiresAuth: true
			},
			children: [
			   {
			       name: 'homefixpass',
			       path: 'homefixpass',
			       component: homefixpass,
			   }, {
			       name: 'homemessage',
			       path: 'homemessage',
			       component: homemessage
			   }, {
			       name: 'homeverifypass',
			       path: 'homeverifypass',
			       component: homeverifypass
			   }				
			 ]
        },
        {
            name: 'goods',
            path: '/goods',
            component: goods,
			meta: {
			    requiresAuth: true
			},
			 children: [
			    {
			        name: 'goodshow',
			        path: 'goodshow',
			        component: goodshow
			    }, {
			        name: 'goodadd',
			        path: 'goodadd',
			        component: goodadd
			    }, {
			        name: 'goodupdate',
			        path: 'goodupdate',
			        component: goodupdate
			    }, {
			        name: 'gooddel',
			        path: 'gooddel',
			        component: gooddel
			    }
				
			  ]
        },
        {
            name: 'order',
            path: '/order',
            component: order,
			meta: {
			    requiresAuth: true
			},
			children: [ {
			       name: 'ordershow',
			       path: 'ordershow',
			       component: ordershow
			   }, {
			       name: 'nodeliver',
			       path: 'nodeliver',
			       component: nodeliver
			   }				
			 ]
        },
		{
		    name: 'login',
		    path: '/login',
		    component: login
		},
		],
		})
		
		
		// 全局路由守卫，即每一个路由都要经过
		router.beforeEach(function (to, from, next) {
		
		    //在全局路由守卫beforeEach中进行页面权限访问控制
		    //先判断目标路由是否需要鉴权
		    if (to.meta.requiresAuth) {
		        //如需鉴权，则先拿到保存在localStrorage里面的信息，然后再判断
		        let admname = localStorage.getItem("admname");
		        if (admname) {
		            next();	
		        } else {
		            router.push({
		                path: '/login',
		                query: {
		                    targetUrl: to.fullPath
		                }
		            })
		        }
		    } else {
		        next();
		    }
		});
export default router;