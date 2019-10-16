import Vue from 'vue'
import App from './App.vue'
import './assets/ic/iconfont.css'

Vue.config.productionTip = false

//引入vue-router

import router from './router/index';


//引入element - ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用element - ui
Vue.use(ElementUI);
// import './assets/rem';
//引入axios  它类似于JS的AJAX
import axios from 'axios';
//把它放到vue的原型对象上面
Vue.prototype.$axios = axios;

//引入vueX
import store from './store';





new Vue({
  //把router实例和store实例注入到vue实例中
  router,
  store,
  render: h => h(App),
}).$mount('#app')