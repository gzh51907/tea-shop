<template>
  <div class="xiang">
    <div class="xiangtop">
      <img src="../assets/images/list/return.png" alt v-on:click="togoods()" />
      <p
        v-for="(item,index) in xianglist"
        :key="item"
        @click="getNum(index)"
        :class="{active:num==index}"
        v-on:click="tocsoll(index)"
      >{{item}}</p>
    </div>
    <div class="xiangcenter">
      <img class="bigimg" :src="imgurl" alt />
      <div class="small_center">
        <p class="pone">
          <span class="price">￥{{price}}.00</span>
          <span class="fukuan">0人付款</span>
        </p>
        <p class="ptwo">{{name}}</p>
        <p class="pthree">
          <span>快递：0.00</span>
          <span>销量0笔</span>
          <span>广东汕头</span>
        </p>
      </div>
      <div class="pingjia">
        <p class="pone">
          <span class="fuwu">服务</span>
          <span>破损包退</span>
          <span>360保障</span>
          <span>正品保证</span>
          <span>7天无理由包退</span>
        </p>
        <p class="ptwo">暂无评价</p>
        <div class="dianpu">
          <div class="dianpu1">
            <img src="../assets/images/list/gucha.png" alt />
            <div class="quanbu">
              <span class="quanbu1">全部宝贝</span>
              <span class="guangguang">进店逛逛</span>
            </div>
          </div>
          <div class="miaoshu">
            <span>宝贝描述5</span>
            <span>宝贝描述5</span>
            <span>宝贝描述5</span>
          </div>
        </div>
      </div>
      <p class="tuijian">店铺推荐</p>
      <div class="xiangqing">
        <h6>商品详情</h6>
      </div>
      <div class="jihe">
        <img v-for="(item,index) in jihe" :key="index" :src="item" alt />
      </div>
    </div>
    <div class="xiangfooter">
      <div class="zaishuo">
        <img src="../assets/images/list/baocun.png" alt />
      </div>
      <div class="jiaru" @click="addcart">
        <span class="cartnum">{{qty}}</span>
        加入购物车
      </div>
      <div class="goumai" @click="gotocart">立即购买</div>
    </div>
  </div>
</template>
<script>
import "../assets/rem";
import qs from "qs";
export default {
  data() {
    return {
      qty: 0,
      xianglist: ["商品", "评价", "详情", "推荐"],
      num: 0,
      imgurl: "",
      price: "",
      name: "",
      gid: "",
      list_name: "",
      gid: "",
      jihe: [
        "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/i15711300990005155.jpeg",
        "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/i15711301000009917.jpeg",
        "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/i15711301010001376.jpeg",
        "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/i15711301020002285.jpeg"
      ]
    };
  },
  computed: {},
  methods: {
    async addcart() {
      console.log(this.gid);
      let username = localStorage.getItem("user");
      let gid = this.gid;
      let qty = "1";
      if (username) {
        let { data } = await this.$axios.post(
          "http://localhost:2020/cart/addcart",
          qs.stringify({
            username,
            gid,
            qty
          })
        );
        if (data == "succes") {
          this.qty++;
        }
      } else {
        alert("请先登录");
        this.$router.push(`/login`);
      }
    },
    getNum(index) {
      this.num = index;
    },
    gotocart() {
      this.$router.push({ path: "/cart" });
    },
    togoods() {
      this.$router.push({
        path: "/goods",
        query: { list_name: this.list_name }
      });
    },
    tocsoll(index) {
      let gotop = document.getElementsByClassName("xiangcenter")[0];
      if (index === 0) {
        gotop.scrollTo(0, 0);
      } else if (index === 1) {
        gotop.scrollTo(0, 600);
      } else if (index === 2) {
        gotop.scrollTo(0, 900);
      } else if (index === 3) {
        gotop.scrollTo(0, 800);
      }
    }
  },
  created() {
    // for (let i = 0; i < this.$store.state.cart.cartlist.length; i++) {
    //   this.qty += this.$store.state.cart.cartlist[i].qty;
    // }
    this.$store.dispatch("getcart");
    for (let i = 0; i < this.$store.state.cart.cartlist.length; i++) {
      this.qty += this.$store.state.cart.cartlist[i].qty-0;
    }

    // let nums = 0;
    // for (let i = 0; i < this.$store.state.cart.cartlist.length; i++) {
    //   nums += this.$store.state.cart.cartlist[i].qty;
    // }

    let {
      items: { name, photo, price }
    } = this.$route.query;
    let { list_name, gid } = this.$route.query;

    this.imgurl = photo;
    this.list_name = list_name;
    this.gid = gid;
    this.price = price;
    this.name = name;
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 0.426667rem;
}

ul li {
  list-style: none;
}
.active {
  color: red;
}
.xiang {
  background-color: #f4f4f4;
  .xiangtop {
    position: fixed;
    width: 100%;
    height: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    img {
      position: fixed;
      left: 0.373333rem;
      top: 0.426667rem;
      width: 0.533333rem;
      height: 0.533333rem;
    }
    p {
      margin: 0 0.266667rem 0.266667rem;
      font-size: 0.48rem;
    }
  }
  .xiangcenter {
    background-color: #f4f4f4;
    position: fixed;
    width: 100%;
    top: 1.6rem;
    bottom: 1.866667rem;
    overflow: auto;
    .bigimg {
      width: 100%;
      height: 8.666667rem;
    }
    .small_center {
      background-color: #fff;
      padding-top: 0.266667rem;
      .pone {
        padding: 0 0.266667rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: red;
          font-size: 0.693333rem;
        }
        .fukuan {
          color: #b7b7b7;
          font-size: 0.373333rem;
        }
      }
      .ptwo {
        margin-top: 0.266667rem;
        margin-left: 0.266667rem;
        font-size: 0.466667rem;
        line-height: 0.84rem;
        width: 75%;
      }
      .pthree {
        display: flex;
        padding: 0 0.266667rem;
        justify-content: space-between;
        align-items: center;
        color: #b7b7b7;
        font-size: 0.373333rem;
        margin-top: 0.533333rem;
        line-height: 1.066667rem;
      }
    }
    .pingjia {
      margin-top: 0.213333rem;
      background-color: #fff;
      padding: 0 0.266667rem;
      margin-bottom: 0.266667rem;
      .pone {
        .fuwu {
          color: #b7b7b7;
        }
        span {
          padding: 0.106667rem;
          font-size: 0.373333rem;
          line-height: 1.433333rem;
        }
      }
      .ptwo {
        font-size: 0.426667rem;
        line-height: 1.4rem;
      }
      .dianpu {
        .dianpu1 {
          display: flex;
          padding: 0 0.266667rem;
          justify-content: space-between;

          .quanbu {
            display: flex;
            align-items: center;

            .quanbu1 {
              border: 1px solid red;
              color: red;
              padding: 0.106667rem 0.213333rem;
              display: inline-block;
              margin-right: 0.106667rem;
              border-radius: 0.266667rem;
            }
            .guangguang {
              color: #fff;
              background-color: red;
              border: 1px solid red;
              padding: 0;
              padding: 0.106667rem 0.213333rem;
              display: inline-block;
              border-radius: 0.266667rem;
            }
          }
        }
        .miaoshu {
          padding: 0 0.266667rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.426667rem;
          color: #989898;
          line-height: 1.693333rem;
        }
      }
    }
    .tuijian {
      font-size: 0.426667rem;
      padding: 0 0.266667rem;
      background-color: #fff;
      line-height: 1.8rem;
    }
    .xiangqing {
      h6 {
        text-align: center;
        line-height: 1.533333rem;
        font-size: 0.426667rem;
        color: #474747;
      }
    }
    .jihe {
      img {
        width: 100%;
      }
    }
  }
  .xiangfooter {
    position: fixed;
    height: 1.866667rem;
    bottom: 0;
    display: flex;
    width: 100%;
    z-index: 99;
    .jiaru {
      width: 28%;
      background-color: #fdbe17;
      color: #fff;
      text-align: center;
      font-size: 0.48rem;
      line-height: 1.866667rem;
      position: relative;
    }
    .goumai {
      width: 28%;
      background-color: red;
      color: #fff;
      text-align: center;
      font-size: 0.48rem;
      line-height: 1.866667rem;
    }
    .cartnum {
      position: absolute;
      top: -0.375rem;
      left: -0.375rem;
      display: block;
      width: 1rem;
      height: 1rem;
      background-color: #4cae4c;
      border-radius: 50%;
      line-height: 1rem;
    }
    .zaishuo {
      width: 44%;
      img {
        margin-top: 0.266667rem;
        width: 100%;
      }
    }
  }
}
</style>