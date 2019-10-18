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
		main
	<router-view />
	</el-main>
  </el-container>
</template>
<script>
export default {
	data(){
		return{
			activeIndex:'/goods/goodshow',
			menus:[
				{
					name: "goods/goodshow",
					path: "/goods/goodshow",
					text: "出售中的商品"
				},
				{
					name: "goods/goodadd",
					path: "/goods/goodadd",
					text: "商品发布"
				},
				{
					name: "goods/goodupdate",
					path: "/goods/goodupdate",
					text: "修改商品信息"
				},
				{
					name: "goods/gooddel",
					path: "/goods/gooddel",
					text: "删除商品"
				}
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
