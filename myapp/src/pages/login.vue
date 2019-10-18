<template>
	<el-container>
	  <el-header class="el-header">
		  <i class="el-icon-arrow-left go"></i>
	  </el-header>
	  <el-main>
		  <div class="imgbox">
			  <img src="../assets/images/login/login-logo.png" alt="">
		  </div>
		  <el-form :model="ruleForm" :rules="rules" ref="regForm" status-icon label-width="100px">
		  	<div class="item">
		  		<i class="el-icon-service icon"></i>
		  			<!-- <el-input v-model.number="ruleForm.username" class="input" placeholder="请输入账号" @focus="bodernone"> -->
					<input type="text" class="input" @focus="bodernone" v-model.number="ruleForm.username" placeholder="请输入账号">
		  		</el-input>
		  	</div>
		  	<div class="item">
		  		<i class="el-icon-view icon"></i>
				<input type="password" class="input" @focus="bodernone" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
		  			<!-- <el-input type="password" v-model="ruleForm.password" autocomplete="off"  class="input" placeholder="请输入密码"> -->
		  		</el-input>
		  	</div>
			<el-form-item><el-button type="text">忘记密码</el-button></el-form-item>
		  	<div>
				<el-button @click="submitForm" class="btn" type="success" >登录</el-button>
				</div>
		  </el-form>
		  <div class="other">
			  <el-button type="text">短信验证登录</el-button>
			  <el-button type="text" @click="goto('/reg')">注册</el-button>
		  </div>
		  
	  </el-main>
	  <el-footer></el-footer>
	</el-container>
	
</template>

<script>
	import 'amfe-flexible'
import qs from 'qs';
export default {
	data() {
		return {
			ruleForm: {
			  username: "",
			  password: "",
			  mdl: true,
			  },
			  rules: {
			      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
			      username: [
			        { required: true, message: "亲，用户名必须填写哟", trigger: "blur" }
			      ]
			    }
		};
	},
	methods: {
		 goto(path){
			  	    this.$router.push(path)
			  	  },
		bodernone(){
			// this.css('border','0px')
			 // $('.input').css('border','red')
		},
	  submitForm() {
	    //   校验整个表单
	    this.$refs.regForm.validate(async valid => {
	      // valid： 所有校验规则都通过后，得到true，只要有一个表单元素校验不通过则得到form
	      if (valid) {
	        // alert('submit!');
	        // 发起ajax请求，等待服务器返回结果
	        // 根据服务器返回结果：注册成功->跳到“我的”
	
	        let { username, password, mdl } = this.ruleForm;
	        let { data } = await this.$axios.post(
	          "http://localhost:2020/user/login",qs.stringify(
	          {
				    username,
				    password,
				    mdl
	          }
			  )
	        );
	        console.log("data:", data);
	
	        if (data.code === 1) {
				// this.$router.replace('/news')
	          let { targetUrl } = this.$route.query;
			  console.log('targetUrl:',targetUrl)
	
	          
	
	          // 把token写入localstorage
	          // localStorage.setItem("Authorization", data.data);
	          // this.$store.commit('login',{username,Authorization:data.data})t
	          // this.$router.replace({path:'/mine',params:{username}})
				this.$store.commit('login',{username,Authorization:data.data})
	          this.$router.replace({
	            // path: targetUrl || "/mine"
				path: "/mine"
	          });
	        } else {
	          alert("用户名或密码不正确");
	        }
	      } else {
	        window.console.log("error submit!!");
	        return false;
	      }
	    });
	  }
	}
};
</script>
<style scoped>
	*{
		font-size: 0.5rem !important;
	}
	.input{
		width: 100%;
		border: #FFFFFF 1px solid;
		height: 1.25rem;
		padding-left: 1.25rem;
	}
	.item{
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.375rem 0;
	}
	.icon{
		font-size: 1.25rem;
		/* line-height:3.125rem; */
	}
	.imgbox{
		text-align: center;
	}
	img{
		height: 100%;
		width: 50%;
	}
	.btn{
		width: 100%;
	}
	.other{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.el-header{
		display: flex;
		align-items: center;
	}
	.go{
		font-size: 1.25rem;
	}
</style>

