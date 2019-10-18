<template>
<el-container>
	<h1 class="title">茶店网后台管理系统</h1>
      <el-header v-show="head">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item :index="item.path" v-for="item in menus" :key="item.name">
			   {{item.text}}
		  </el-menu-item>
		  <h5 class="welcome">
			  欢迎您,{{getname}}
			  <el-button type="text" v-show="outshow" @click="logout" >退出</el-button>
			</h5>
        </el-menu>
      </el-header>
     <el-main>
      <router-view />
      </el-main>
    </el-container>
</template>

<script>
export default {
	data(){
		return{
			head:true,
			activeIndex:'/home',
			menus:[
				{
					name: "home",
					path: "/home",
					text: "首页"
				},
				{
					name: "goods",
					path: "/goods",
					text: "商品管理"
				},
				{
					name: "order",
					path: "/order",
					text: "订单管理"
				}
			],
		}
	},
	
	created() {
	  this.$store.dispatch('checkLogin');
	  // console.log(this.$route.path)
	  if(this.$route.path=='/login'){
		  this.head=false
	  };
	},
	
	
	computed:{
		getname(){
			return this.$store.state.common.admname
		},
		outshow(){
			return this.$store.state.common.admname
		}
	},
	methods: {
		logout(){
			this.goto("/login")
			this.$store.commit('logout');
		},
	  handleSelect(index) {
	    this.activeName = index;
	  },
	  goto(path){
	    this.$router.push(path)
	  }
	},
	watch:{
	      $route(to){
	        if(to.path == '/login'){
				this.head=false
	        }else if(this.path=='/login'){
				this.head=false
			}
			else{
				this.head=true
			}
	      }
	}
}
</script>

<style lang='scss' scoped>
	.title{
		margin: auto;
	}
	.welcome{
		float: right;
	}
	/* .el-header{
		display: none;
	} */
</style>



