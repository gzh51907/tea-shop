<template>
	<el-container>
		<el-header class="el-header">
				  <i class="el-icon-arrow-left go" @click="goto('/login')"></i>
		</el-header>
		 <el-main>
	<el-form
	 :model="ruleForm"
	 :rules="rules"
	 ref="regForm"
	 status-icon
	 label-width="100px"
	  >
	  <h5>免费注册</h5>
	   <el-form-item label="" prop="username"  label-width="0px">
	  	 		   <el-input v-model.number="ruleForm.username" placeholder="请输入账号"></el-input>
	  	 		 </el-form-item>
	  	   <el-form-item label="" prop="pass" label-width="0px">
	  	     <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
	  	   </el-form-item>
	  	   <el-form-item label="" prop="checkPass" label-width="0px">
	  	     <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
	  	   </el-form-item>
		   <div>
		   	  	<el-button @click="submitForm" class="btn" type="primary">注册</el-button>
		   	</div>
	 </el-form>
	   </el-main>
	 </el-container>
</template>

<script>
	import qs from 'qs';
	 export default {
	    data() {
	      const validatePass = (rule, value, callback) => {
	           if (value !== this.ruleForm.password) {
	             //   校验失败
	             callback(new Error("两次输入密码不一致!"));
	           } else {
	             //   通过校验
	             callback();
	           }
	         };
			 const checkUsername = async (rule, value, callback) => {
			 
			   let {data} = await this.$axios.get('http://localhost:2020/user/check',{
			     params:{
			       username:this.ruleForm.username
			     }
			   });
			   if(data.code === 0){
			     callback(new Error("用户名已存在"));
			   }else{
			     callback();
			   }
			 };
	      return {
	        ruleForm: {
	          pass: '',
	          checkPass: '',
	          username: ''
	        },
	        rules: {
	          password: [
	                   { required: true, message: "请输入密码", trigger: "blur" },
	                   {
	                     min: 6,
	                     max: 12,
	                     message: "密码长度必须为 6 到 12 个字符",
	                     trigger: "blur"
	                   }
	                 ],
			  checkPass: [
			      { required: true, message: "请确认密码", trigger: "blur" },
			      { validator: validatePass, trigger: "blur" }
			      ],
	           username: [
	                    { required: true, message: "亲，用户名必须填写哟", trigger: "blur" },
	                    { validator: checkUsername, trigger: "blur" }
	                  ]
	        }
	      };
	    },
	    methods: {
				goto(activeIndex){
				    this.$router.push(activeIndex)
				  },
	      submitForm(regForm) {
	        this.$refs.regForm.validate( async (valid) => {
	          if (valid) {
	           let {username,password}=this.ruleForm;	
					let {data} = await this.$axios.post('http://localhost:2020/user/reg',qs.stringify({
						  username,
						  password
					}))	;
					if(data.code===1){
						 this.$router.replace({name:'login',params:{username},query:{username}})
					}else{
						alert('注册失败');
					}
	          } else {
	            return false;
	          }
	        });
	      },
	      resetForm(regForm) {
	        this.$refs.regForm.resetFields();
	      }
	    }
	  }
</script>
<style>
	h5{
		text-align: center;
	}
</style>

