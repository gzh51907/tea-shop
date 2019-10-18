<template>
  <div>
    <div class="byuas-ca">购物车</div>
    <div class="bgyasd-ytas" style="height:450px;overflow-y:auto">
      <div class="byuas-cb">
        <div class="byuasa">
          <span class="gyta-w">&nbsp;购物车</span>
          <br />
          <span class="gyta-e">
            &nbsp;共
            <el-badge :value="qtylength"></el-badge>&nbsp;件宝贝
          </span>
        </div>
        <div class="gytb">管理 &nbsp;</div>
      </div>
      <div class="byuaswq-wey">
        <p class="byuaswq-uy"></p>
        <div class="byuas-coy">
          <div class="byuas-coc">
            <div class="byuas-ytasc">
              &nbsp; &nbsp;
              <!-- <input type="checkbox" name="Bike" /> -->
              <span class="bbyuas">
                <i class="el-icon-school"></i>
                商品
              </span>
            </div>
			<div>
				<input type="checkbox" name="all" v-model="$store.state.cart.isall"  @change="ischeck()"/>全选
			</div>
            <el-row :gutter="30" v-for="item in $store.state.cart.cartlist" :key="item._id">
              <el-col :span="1">
                &nbsp;
                <el-col :span="12" class="hyuqw-asd">
				  <input type="checkbox" name="Bike"  @change="checkall()" v-model="item.check"/>
                </el-col>
              </el-col>
              <el-col :span="8">
                <img class="pic" :src="item.imgurl" alt />
              </el-col>
              <el-col :span="13">
                <!--  -->
                <div id="app">
                  <p>
                    <!-- 使用 router-link 组件来导航. -->
                    <!-- 通过传入 `to` 属性指定在main.js文件设置的别名链接，如/1 -->
                    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
                    <router-link to="/1">
                      <h5 class="title">{{item.name}}</h5>
                    </router-link>
                  </p>
                  <!-- 路由出口 -->
                  <!-- 点击<router-link>的时候指定的页面将渲染在这里 -->
                  <router-view></router-view>
                </div>
                <!--  -->

                <div>
                  <span class="price">{{item.price}}</span>
                  &nbsp;
                  <span>
                    <el-input-number
                      size="mini"
                      v-model="item.qty"
                      @change="changeQty(item._id,item.gid,$event)"
                    ></el-input-number>
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="byuaswq-uy"></p>
      </div>
    </div>
    <div class="puai-ewqa">
      <div>
        &nbsp;
        <el-button icon="el-icon-delete" size="mini" @click="removecart">删除已选</el-button>
      </div>
      <div class="puai-ewqb">
        <div>
          合计:
          <span class="price">{{totalPrice}}</span>
        </div>
      </div>
      <div class="puai-ewqc">
        <el-button type="danger" round >
          提交订单
        </el-button>
      </div>&nbsp;
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
		cartrou:'',
	}
  },
  created(){
	 this.$store.dispatch("getcart"); 
  },
  computed: {
	  qtylength(){
		  let num=0;
		  for(let i=0;i<this.$store.state.cart.cartlist.length;i++){
			  num +=this.$store.state.cart.cartlist[i].qty
		  }
		return  num
	  },
	
    cartlist() {
      return this.$store.state.cart.cartlist;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },
  methods: { 
	  // addorder(){
		 //  // let arr=this.$store.getter.getcid;
		 //  // let arr=[1,2,3];
		 //  let id=arr.join("|")
		 //  this.$router.push({
		 //    path: "/order",
		 //    query: {id:id}
		 //  });
	  // },
	  checkall(){
		  this.$store.commit("chackall");
	  },
	  ischeck(){
		  this.$store.commit("ischeck");
	  },
	  getcart(){
	    this.$store.dispatch("getcart");
	  },
    changeQty(_id, gid, qty) {
      // this.$store.commit('changeQty',{id,qty})
      this.$store.dispatch("changeQtyAsync", {_id, gid, qty });
    },
    removecart() {
      // this.$store.commit("removeFromCart");
	   this.$store.dispatch("removecart");
    },
    clearCart() {
      this.$store.commit("clearCart");
    }
  }
};
</script>
<style lang="scss" scoped>
	*{
		font-size: 0.5rem ;
	}
.bgyasd-ytas {
  background: #e7e6e6;
  width: 100%;
  height: 100%;
}
.bgyasd-ytas::-webkit-scrollbar {
  display: none;
}
.byuas-ca {
  color: rgb(255, 255, 255);
  display: flex;
  font-size: 0.5rem;
  width: 100%;
  height: 1rem;
  background: linear-gradient(to right, #fe4101, #f02b2b);
  justify-content: center;
  align-items: center;
}
.byuas-cb {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 3rem;
  display: flex;
  background: linear-gradient(to right, #fe4101, #f02b2b);
  justify-content: space-between;
  // position: relative;
  
}
.byuas-cb .gytb {
  line-height: 1rem;
  font-size: 0.5rem;
  height: 1.25rem;
  
}
.byuas-cb .gyta-w {
  line-height: 1rem;
  font-size: 0.3rem;
}
.byuas-cb .gyta-e {
  font-size: 0.4rem;
}
.byuas-coy {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.byuas-coc {
  background: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  margin-bottom: 0.4rem;
  margin-top: -0.5rem;
}
.byuas-ytasc {
  // margin-top: 2rem;
  line-height: 1rem;
  // position: absolute;
  // bottom: 0;
}
.el-icon-school {
  color: rgb(255, 0, 0);
  font-size: 0.75rem;
}
.bbyuas {
  font-size: 0.5rem;
}
.byuaswq-wey {
  display: flex;
}
.byuaswq-uy {
  width: 0.35rem;
  height: 100%;
}
.puai-ewqa {
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.puai-ewqb {
  display: flex;
  align-items: center;
}
.puai-ewqc {
  display: flex;
  align-items: center;
}
.price {
  color: #f00;
  margin-left: 2.5px;
  &::before {
    content: "￥";
  }
}
.hyuqw-asd {
  margin-left: -0.45rem;
}
a {
  color: #000;
  text-decoration: none;
}
.title{
	font-size: 0.3rem;
}
.pic{
	width: 2.5rem;
	heig: 2.5rem;
}
</style>