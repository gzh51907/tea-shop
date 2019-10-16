<template>
  <div>
    <h3>测试</h3>
	<el-button type="primary" plain @click='fineuser'>主要按钮</el-button>
  </div>
</template>
<script>
import qs from 'qs';
export default {
	methods:{
		async fineuser(){
			let username ='13106654783'
			let { data } = await this.$axios.post(
			  "http://localhost:2020/user/finduser",qs.stringify(
			  {
				    username,
			  }
			  )
			);
			console.log("data:", data);
		}
	}
};
</script>