<template>
  <el-container>
    <el-aside width="200px">
	   <el-menu :default-active="activeIndex"  class="el-menu-vertical-demo" @select="handleSelect" router>
	     <el-menu-item :index="item.path" v-for="item in menus" :key="item.name">
	       <i class="el-icon-setting"></i>
	       <span slot="title">{{item.text}}</span>
	     </el-menu-item>
	   </el-menu>
	</el-aside>
    <el-main>
	<router-view />
	</el-main>
  </el-container>
</template>
<script>
export default {
	data(){
		return{
			activeIndex:'/order/ordershow',
			menus:[
				{
					name: "order/ordershow",
					path: "/order/ordershow",
					text: "订单管理"
				},
				{
					name: "order/nodeliver",
					path: "/order/nodeliver",
					text: "待发货订单"
				},
			],
		}
	},
	methods: {
	  handleSelect(index, indexpath) {
	 	    this.activeName = index;
	 	  },
	  goto(path){
	    this.$router.push(path)
	  }
	},
}
</script>
