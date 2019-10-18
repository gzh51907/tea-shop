 <template>
	 <div>
		<ul class='msg'>
					<li v-for="(item,index) in adm" :key='item.text' @click="fixmsg(index)">
						<p class="name">
						{{item.text}}
						</p>
						<p>
							{{item.msg}}
						</p>	
					</li>
				</ul>
	 </div>
  </template>

  <script>
	  import qs from 'qs';
    export default {
      data() {
        return {
        adm:[          
       		{
       			msg:'ads',
       			text:'店铺名称：',
       			type:'admname'
       		},
       		{
       			msg:'ddd',
       			text:'销量：',
       			type:'xiaoliang'
       		},
       		{
       			msg:'aaa',
       			text:'评分：',
       			type:'pingfen'
       		},
			{
				msg:'aaa',
				text:'收藏量：',
				type:'shouchang'
			},
			{
				msg:'aaa',
				text:'成交额：',
				type:'chengjiaoe'
			},
       	],
        }
      },
	  async mounted() {
	  		let admname = localStorage.getItem("admname");
	  		if(admname){
	  			let { data } = await this.$axios.post(
	  			  "http://localhost:2020/adm/findadm",qs.stringify(
	  			  {
	  				    admname,
	  			  }
	  			  )
	  			);	
					// console.log(data)
	  			for(let i=0;i<this.adm.length;i++){
	  				for(let j=0;j<Object.keys(data[0]).length;j++){
	  					if(Object.keys(data[0])[j]==this.adm[i].type){
	  							this.adm[i].msg=data[0][Object.keys(data[0])[j]];
	  						}
	  				}
	  			}
	  		}else{
	  			this.$router.push(`/login`);
	  		}
	  },
    }
  </script>
<style scoped>
	ul,li{
		list-style: none;
	}
	li{
		width: 100%;
		display: flex;
		/* justify-content: space-between; */
		border-bottom: #7F7F7F 0.0625rem solid;
		color: #555555;
	}
	.name{
		width: 12.5rem;
	}
</style>