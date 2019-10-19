<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="商品名称" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="商品产地" prop="region">
		    <el-input v-model="ruleForm.region"></el-input>
		  </el-form-item>
		  <el-form-item label="商品单价" prop="price">
		    <el-input v-model="ruleForm.price"></el-input>
		  </el-form-item>
		  <el-form-item label="商品库存" prop="kucun">
		    <el-input v-model="ruleForm.kucun"></el-input>
		  </el-form-item>
		  <el-form-item label="商品图片" prop="photo">
		    <el-input v-model="ruleForm.photo"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域" prop="region">
		    <el-select v-model="ruleForm.fenleu1" placeholder="请选择活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
		  region:'',
		  price:'',
		  kucun:'',
		  photo:'',
		  fenleu1:''
		  
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
		  region: [
		    { required: true, message: '请输入商品产地', trigger: 'blur' },
		    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		  ],
		  price: [
		    { required: true, message: '请输入商品价格', trigger: 'blur' },
		    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		  ],
		  kucun: [
		    { required: true, message: '请输入商品库存', trigger: 'blur' },
		    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		  ],
		  photo: [
		    { required: true, message: '请输入图片地址', trigger: 'blur' },
		    { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		  ],
          fenleu1: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
		
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
	
</style>
