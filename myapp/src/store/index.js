import Vue from 'vue';
import Vuex from 'vuex';
import common from "./common.js";
import cart from "./cart.js";

//使用vuex
Vue.use(Vuex);
//创建store实例
const store = new Vuex.Store({
	
    modules: {
		common,
		cart
    }
});
export default store;