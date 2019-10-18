<template>
  <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.goodsid }}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.admname }}</span>
          </el-form-item>
          <el-form-item label="收货人名称">
            <span>{{ props.row.consignee }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
      prop="_id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="goodsname">
    </el-table-column>
    <el-table-column
      label="商品数量"
      prop="num">
    </el-table-column>
	<el-table-column
	  label="交易金额"
	  prop="money">
	</el-table-column>
	<el-table-column
	  label="订单状态"
	  prop="state">
	</el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 48%;
  }
</style>

<script>
	import qs from 'qs';
  export default {
    data() {
      return {
		price:'',
        tableData5: [
			// {
    //       id: '12987122',
    //       goodsname: '好滋好味鸡蛋仔',
		  // goodsid:'15415',
    //       desc: '169',
		  // num:'2',
		  // money:'330',
    //       address: '上海市普陀区真北路',
    //       shop: '王小虎夫妻店',
    //       shopid: '10333',
		  // consignee:'覃宁',
		  // state:"已发货"
    //     },
		]
      }
    },
	// computed:{
	// 	getprice(){
	// 		this.price=this.tableData5.price
	// 	}	
	// },
	async mounted() {
		let admname = localStorage.getItem("admname");
		if(admname){
			let { data } = await this.$axios.post(
			  "http://localhost:2020/order/findorder",qs.stringify(
			  {
				    admname,
			  }
			  )
			);		
			console.log(data)
			for(let i=0;i<data.length;i++){
				data[i].money=data[i].num*data[i].price
			}
			// data[0].money=data[0].num*data[0].price
			this.tableData5=data;
			// for(let i=0;i<this.user.length;i++){
			// 	for(let j=0;j<Object.keys(data[0]).length;j++){
			// 		if(Object.keys(data[0])[j]==this.user[i].type){
			// 				this.user[i].msg=data[0][Object.keys(data[0])[j]];
			// 			}
			// 	}
			// }
		}else{
			this.$router.push(`/login`);
		}
		
		},
  }
</script>