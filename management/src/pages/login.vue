<template>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="请输入用户名" prop="admname">
    <el-input  v-model="ruleForm2.admname" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="请输入新密码" prop="password">
    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
	import qs from 'qs';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
		callback();
      };
	  var validateName = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入用户名'));
	    } 
		callback();
	  };
      return {
        ruleForm2: {
          password: '',
		  admname:''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
		  admname: [
		    { validator: validateName, trigger: 'blur' }
		  ]
        }
      };
    },
    methods: {
         submitForm(formName) {
           this.$refs[formName].validate( async(valid) => {
             if (valid) {
   			let {admname}=this.ruleForm2;
   			let {password} = this.ruleForm2;
   			let { data } = await this.$axios.post(
   			  "http://localhost:2020/adm/login",qs.stringify(
   			  {
   				    admname,
   				    password
   			  }
   			  )
   			);
   			window.console.log("data:", data);
   			 if (data.code === 1) {
						// localStorage.setItem("admname", admname);
						this.$store.commit('login',{admname})
   				          this.$router.replace({
   				            path:"/home"
   				          });
   				        } else {
   				          alert("账号或者密码错误，请重新登录");
   				        }
             } else {
				 alert('失败')
               return false;
             }
           });
         },
         resetForm(formName) {
           this.$refs[formName].resetFields();
         }
       },
  }
</script>
