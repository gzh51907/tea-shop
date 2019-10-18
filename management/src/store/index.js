import Vue from 'vue';
import Vuex from 'vuex';
import common from "./common.js";

//使用vuex
Vue.use(Vuex);
//创建store实例
const store = new Vuex.Store({
    modules: {
		common
    }
});
export default store;