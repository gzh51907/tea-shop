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
			activeIndex:'/home/homemessage',
			menus:[
				{
					name: "home/homemessage",
					path: "/home/homemessage",
					text: "商家信息"
				},
				{
					name: "home/homeverifypass",
					path: "/home/homeverifypass",
					text: "修改密码"
				},
			],
		}
	},
	methods: {
	  handleSelect(index) {
	 	    this.activeName = index;
	 	  },
	  goto(path){
	    this.$router.push(path)
	  }
	},
}
</script>
