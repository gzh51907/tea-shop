<template>
	<div class="box">
		<div class="top">
			<i class="el-icon-arrow-left" @click="goto('/mine')"></i>
		</div>
		<ul class='msg'>
			<li>
				<p>头像</p>
				<p class="pic">
					<img src="../assets/logo.png" alt="">
				</p>			
			</li>
			<li v-for="(item,index) in user" :key='item.text' @click="fixmsg(index)">
				<p>
				{{item.text}}
				</p>
				<!-- contenteditable -->
				<p>
					{{item.msg}}
					<i class="el-icon-arrow-right"></i>
				</p>	
			</li>
		</ul>
		 <div class="zhezhao" v-show="zhezhao">
			 <div class="fixmsg" v-for="(item,index) in user" v-if='item.istrue==true' :key='item.text'>
			 	 <h5>修改{{user[index].text}}</h5>
			 	 <el-input
			 	   placeholder="请输入内容"
			 	   v-model="user[index].msg"
			 	   clearable>
			 	 </el-input>
			 	 <el-button type="success" @click="close(index)">保存</el-button>
			 </div>
		 </div>
		 
	</div>
	
</template>

<script>
	import qs from 'qs';
	export default {
		data(){
			return{
				ismsg:"",
				zhezhao:false,
				ischange:'',
				thedata:'',
				user:[
					{
						msg:'',
						text:'会员名',
						istrue:false,
						type:'member'
					},
					{
						msg:'',
						text:'昵称',
						istrue:false,
						type:'name'
					},
					{
						msg:'',
						text:'性别',
						istrue:false,
						type:'gender'
					},
				],
			}
		},
		methods:{
			show(){
				console.log	(this.user)
			},
			goto(activeIndex){
				  	    this.$router.push(activeIndex)
				  	  },
			fixmsg(index){
				this.ischange=this.user[index].msg;
				this.user[index].istrue=true;
				this.zhezhao=true;
			},
			close(index){
				this.user[index].istrue=false;
				this.zhezhao=false;
				if(this.ischange!=this.user[index].msg){
					this.gofix(index);
				}
			},
			async gofix(index){
				let username = localStorage.getItem("user");
				let fil=this.user[index].type;
				var obj = {};
				obj [fil]=this.user[index].msg;
				console.log(obj)
				let { data } = await this.$axios.post(
				  "http://localhost:2020/user/fixmsg",qs.stringify(
				  {
					    username,
						obj
				  }
				  )
				);
			}
		},
		async mounted() {
				let username = localStorage.getItem("user");
				if(username){
					let { data } = await this.$axios.post(
					  "http://localhost:2020/user/finduser",qs.stringify(
					  {
						    username,
					  }
					  )
					);				
					for(let i=0;i<this.user.length;i++){
						for(let j=0;j<Object.keys(data[0]).length;j++){
							if(Object.keys(data[0])[j]==this.user[i].type){
									this.user[i].msg=data[0][Object.keys(data[0])[j]];
								}
						}
					}
				}else{
					this.$router.push(`/login`);
				}
				
		}
	}
</script>

<style scoped>
	*{
		font-size: 0.5rem;
	}
	.top{
		height: 1.875rem;
	}
	.top i{
		font-size: 0.8rem;
	}
	.pic{
		width: 1.5rem;
		height: 1.5rem;
	}
	.pic img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.msg{
		margin-bottom: 2.5rem;
	}
	.msg li{
		border-bottom: #777777 solid 0.0625rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.625rem;
	}
	.el-button{
		width: 100%;
	}
	.box{
		padding: 0.3rem;
		width:100%;
		height: 100%;
		position: relative;
	}
	.zhezhao{
		width:100%;
		height: 100%;
		background-color: #dcdcdc7d;
		position: absolute;
		left: 0;
		top: 0;
	}
	.fixmsg{
		padding: 0.625rem;
		background-color: #f4b636e8;
		width: 70%;
		height: 6.25rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 5;
		border: #969896 solid 0.0625rem;
	}
</style>
