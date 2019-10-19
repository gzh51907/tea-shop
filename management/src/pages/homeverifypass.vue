<template>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="请输入原密码" prop="password">
    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
  </el-form-item>
</el-form>
</template>
<script>
	import qs from 'qs';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm2: {
          password: ''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
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
			  "http://localhost:2020/adm/checkadmpass",qs.stringify(
			  {
				    admname,
				    password
			  }
			  )
			);
			window.console.log("data:", data);
			 if (data.code === 1) {
				          this.$router.replace({
				            path:"/home/homefixpass"
				          });
				        } else {
				          alert("密码不正确");
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