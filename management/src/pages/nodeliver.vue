<template>
	<div>
		未发货
		<el-button @click='gofix'>默认按钮</el-button>
		<p>{{data}}</p>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				data:[]
			}
		},
		methods:{
			async gofix(){
				let { data } = await this.$axios.post("http://localhost:2020/order/inset");
				console.log(data)
				this.data=data;
			}
		},
	}
</script>

<style>
	
</style>
