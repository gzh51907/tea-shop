<template>
	<div>
		<el-tabs type="border-card" v-model="istab">
		  <el-tab-pane v-for="(item,index) in tab" :key='item' :label="item" :name=item>
			  共{{tableData5.length}}条订单
		  </el-tab-pane>
		</el-tabs>
  <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品 ID">
            <span>{{ props.row.goodsid }}</span>
          </el-form-item>
         <el-form-item label="店铺名称">
            <span>{{ props.row.admname }}</span>
          </el-form-item>
          <el-form-item label="收货人名称">
            <span>{{ props.row.username }}</span>
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
	  <el-table-column
	      fixed="right"
	      label="操作"
	      width="100">
	      <template slot-scope="scope" >
			  <el-dropdown>
			    <span class="el-dropdown-link">
			      修改状态<i class="el-icon-arrow-down el-icon--right"></i>
			    </span>
			    <el-dropdown-menu slot="dropdown">
			      <el-dropdown-item v-for="(item,index) in state" :key='item'>
				  <el-button type="text"  @click="change(index,scope.row)" >{{item}}</el-button>
				  </el-dropdown-item>
			    </el-dropdown-menu>
			  </el-dropdown>
	      </template>
	    </el-table-column>
  </el-table>
  </div>
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
		istab:"全部订单",
		tab:["全部订单","未付款","待发货","待收货","已完成"],
		state:["未付款","待发货","待收货","已完成"],
		price:'',
		alldata:[],
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
	methods:{
		async change(index,isdata){
			for(let i=0;i<this.tableData5.length;i++){
				if(isdata._id==this.tableData5[i]._id){
					this.tableData5[i].state=this.state[index];
				}
			};
			let state=index;
			let _id=isdata._id;
			let { data } = await this.$axios.post("http://localhost:2020/admorder/fixstate",qs.stringify(
			  {
				    state,
					_id
			  }));	
			  // console.log(data)
		},
		
	},
	watch:{
		istab:function(){
			console.log(this.alldata.length,this.istab)
			this.tableData5=[];
			let a=this.alldata.length
			if(this.istab=="全部订单"){
				this.tableData5=this.alldata
			}else{
				for(let i=0;i<a;i++){
					if(this.istab==this.alldata[i].state){
						this.tableData5.push(this.alldata[i])
					}
				}
			}
			
		}
	},
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
			for(let i=0;i<data.length;i++){
				data[i].money=data[i].num*data[i].price;
				data[i].state=this.state[data[i].state]
			}
			this.alldata=data;
			this.tableData5=data;
		}else{
			this.$router.push(`/login`);
		}
		
		},
  }
</script>