<template>
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
		  <el-form-item label="收件人">
		    <el-input v-model="formInline.user" placeholder="请输入买家名称"></el-input>
		  </el-form-item>
		  <el-form-item label="订单号">
		    <el-input v-model="formInline._id" placeholder="请输入订单号"></el-input>
		  </el-form-item>
		  <el-form-item label="邮件模板">
		    <el-select v-model="formInline.region" placeholder="订单状态" @change="setindex()">
		      <el-option v-for="(item,index) in state" :label="item.text" :value="item.text" :key="item.text" >
			  </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="getmsg">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-input
		  type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		  v-model="textarea">
		</el-input>
		<el-button type="primary" @click="setmsg" style="margin-top:1.875rem;">发送消息</el-button>
	</div>
</template>

<script>
	import qs from 'qs';
	export default {
		 data() {
		    return {
			  state:[
				 {
					 text:'未付款',
					 state:"0",
					 please:"如果24小时内未付款，该订单将会自动取消",
				 }, {
					 text:'待发货',
					 state:"1",
					 please:"我们将会尽快发货",
				 },  {
					 text:'待收货',
					 state:"2",
					 please:"已经发货，请注意查收",
				 },  {
					 text:'已完成',
					 state:"3",
					 please:"已经送达，请给5星好评",
				 }, 
				 
			  ]	,
		      textarea: '',
			  theindex:0,
			  formInline: {
			           user: '',
			           region: '',
					   _id:""
			         }
		    }
		  },
		    methods: {
				setindex(){
					console.log(this.formInline.region)
					for(let i=0;i<this.state.length;i++){
						if(this.formInline.region==this.state[i].text){
							this.theindex=i;
						}
					}
				},
		    async getmsg() {
					let _id= this.formInline._id;
					let username= this.formInline.user;
					let { data } = await this.$axios.post("http://localhost:2020/admorder/findorder",qs.stringify(
					  {
						    username,
							_id
					  }));	
					  // console.log(data.data[0].goodsname)
					  // console.log(data.code)
					  if(data.code==0){
						  alert("买家名称或订单号错误")
					  }else{
						  let date = new Date();
						 this.textarea=`亲爱的${this.formInline.user},你所购买的${data.data[0].goodsname}${this.formInline.region},${this.state[this.theindex].please}
						 ${date .toLocaleString()}` 
					  }
		          
		        },
				async setmsg() {
					if(this.textarea && this.formInline.user){
						let msg=this.textarea;
						let username= this.formInline.user;
						let { data } = await this.$axios.post("http://localhost:2020/admorder/setmsg",qs.stringify(
						  {
							    username,
								msg
						  }));	
						  if(data.code==0){
							  alert("发送失败")
						  }else{
							  alert("发送成功")
						  }
					}else{
						alert("请输入买家名称和内容")
					}
						
				    },
		      }
	}
</script>

<style>
	
</style>
