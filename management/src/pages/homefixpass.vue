<template>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="请输入新密码" prop="password">
    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认新密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          password: '',
          checkPass: ''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
         submitForm(formName) {
           this.$refs[formName].validate( async(valid) => {
             if (valid) {
   			let admname='xiaoxie'
   			let {password} = this.ruleForm2;
   
   			let { data } = await this.$axios.post(
   			  "http://localhost:2020/adm/fixpass",qs.stringify(
   			  {
   				    admname,
   				    password
   			  }
   			  )
   			);
   			window.console.log("data:", data);
   			 if (data.code === 1) {
						alert("密码修改成功，请重新登录");
   				          this.$router.replace({
   				            path:"/login"
   				          });
   				        } else {
   				          alert("未知错误，请重新修改");
   				        }
             } else {
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
