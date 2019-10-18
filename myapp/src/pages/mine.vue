<template>
	<div>
		<div class="header">
			<i class="el-icon-setting"></i>
			<div class="usermsg" @click="goto('/usermsg')">
				<h4 class="logo"><img src="../assets/logo.png" alt=""></h4>
				<h5 class="name">{{currenUser}}</h5>
			</div>
				<ul class="collect" >
					<li v-for='item in collect' :key='item.text'>
						<p>{{item.num}}</p>
						<p>{{item.text}}</p>
					</li>
				</ul>
		</div>
		<div class="main">
			<div class="myorder">
				<h5 class='lr'>
					<p>我的订单</p>
					<p style="font-size: 0.875rem;color: #999999;">查看全部订单>></p>
				</h5>
				<ul class="collect"  >
					<li v-for='item in order' :key='item.text'>
						<p :class="item.icon"></p>
						<p style="font-size: 0.875rem;">{{item.text}}</p>
					</li>
				</ul>
			</div>
			<div class="myorder">
				<h5 class='lr'>
					<p>工具箱</p>
					<p style="font-size: 0.875rem;color: #999999;"></p>
				</h5>
				<ul class="collect" style="flex-wrap: wrap;" >
					<li v-for='item in tool' :key='item.text' >
						<p :class="item.icon" style="font-size: 1.25rem;"></p>
						<p style="font-size: 0.875rem;">{{item.text}}</p>
					</li>
				</ul>
			</div>
		</div>
		<el-button type="warning" plain @click="logout">退出</el-button>
	</div>
</template>
<script>
export default {
	data(){
		return{
			collect:[
				{
					num:88,
					text:'收藏夹'
				},
				{
					num:88,
					text:'关注店铺'
				},
				{
					num:88,
					text:'足迹'
				},
				{
					num:88,
					text:'积分'
				}
			],
			order:[
				{
					icon:'el-icon-upload',
					text:'待付款'
				},
				{
					icon:'el-icon-question',
					text:'待发货'
				},
				{
					icon:'el-icon-success',
					text:'待收货'
				},
				{
					icon:'el-icon-star-on',
					text:'评价'
				},
				{
					icon:'el-icon-question',
					text:'退款/售后'
				}
			],
			tool:[
				{
					icon:'el-icon-message',
					text:'我的收藏'
				},
				{
					icon:'el-icon-sold-out',
					text:'收货地址'
				},
				{
					icon:'el-icon-printer',
					text:'我的评价'
				},
				{
					icon:'el-icon-news',
					text:'个人资料'
				},
				{
					icon:'el-icon-bell',
					text:'账户安全'
				},
				{
					icon:'el-icon-mobile-phone',
					text:'我要开店'
				},
				{
					icon:'el-icon-edit',
					text:'优惠卷'
				},
				{
					icon:'el-icon-message',
					text:'红包'
				},
			],
			
		}
	},
	computed:{
		currenUser(){
			return localStorage.getItem("user");
			
		},
	},
	methods:{
		logout(){
			 this.$store.commit('logout');
			 this.$router.push('./login')
		},
		goto(activeIndex){
	    this.$router.push(activeIndex)
	  }
	},
	// created() {	
	//     this.$store.dispatch('checkLogin');	
	//   },
};
</script>
<style scoped>
	*{
		padding: 0;
		margin: 0;
		font-size: 0.5rem !important;
		list-style: none;
	}
	.header{
		padding: 0.3rem 0;
		background-color:#ffeb3b66;
		position: relative;
	}
	.collect{
		display: flex;
		color: #D43F3A;
	}
	.collect li{
		padding: 0.3rem 0;
		font-size: 0.42rem;
		width: 25%;
		text-align: center;
	}
	.logo{
		width: 2.0rem;
		height: 2.0rem;
		margin: auto;
	}
	.logo img{
		width: 100%;
		height: 100%
	}
	.el-icon-setting{
		position: absolute;
		right: 0.3rem;
		top:0.3rem;
		font-size: 1rem;
	}
	.myorder{
		border: 1px solid #ADADAD;
		border-radius: 0.3rem;
		margin-top: 1rem;
	}
	.lr{
		display: flex;
		justify-content: space-between;
		padding: 0.3rem 0.3rem;
		font-size: 14px;
		color: #3C3C3C;
		border-bottom: 0.0625rem solid #ADADAD;
	}
</style>