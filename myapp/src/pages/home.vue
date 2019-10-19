<template>
  <div class="index">
    <div class="top"></div>
    <div class="header">
      <i class="el-icon-menu icon"></i>
      <input type="text" placeholder="请输入需要修改的内容" />
      <i class="el-icon-message icon"></i>
    </div>
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="(item,index) in lunbo" :key="index">
          <!-- <h3>{{ item.img }}</h3> -->
          <img :src="item.img" alt style="width: 100%;height: 100%;" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="fenlei">
      <ul>
        <li v-for="item in fenlei" :key="item.text">
          <img :src="item.img" alt />
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <div class="goodlist">
      <dl v-for="item in goods" :key="item.gid">
        <dt>
          <img :src="item.photo" alt />
        </dt>
        <dd>
          <p class="title">{{item.name}}</p>
          <p>
            <span class="price">￥{{item.price}}</span>
            <span>0人付款</span>
          </p>
        </dd>
      </dl>
    </div>
    <div class="foot"></div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      lunbo: [
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/d44a8fedb3644860b5ffdb30f76510f3.jpg"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/6f38f2fa4d5c46f6ad98f11f3fb2988d.jpg"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/dcb51109e25d4b4cb5dd140c42159ea5.jpg"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/46ff188aedd04c96ae72d56eaead2b2c.jpg"
        }
      ],
      goods: [],
      fenlei: [
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/13b8ba8d765744ec9ee0867ba6eb4619.png",
          text: "黑茶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/95c9bc7f9bba49088cf77a61b8c36297.png",
          text: "白茶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/cc624150985e4fe39d893a8d6f783829.png",
          text: "乌龙茶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/d1abcca6e5824ea2b71b2d53f84d0091.png",
          text: "红茶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/d33389f7c42143fc8fb3e4175448af9d.png",
          text: "绿茶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/f2eef3e6017d4e5991dd54c961009a30.png",
          text: "花果茶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/bc046fd72ad3402f92aef08d4ee449f9.png",
          text: "茶具"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/b6679dcd1e1c4f259f60db813b6ed222.png",
          text: "茶壶"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/569cc4389bbb4bf795b0f0f19f8b1938.png",
          text: "茶盘"
        },
        {
          img:
            "https://chadian-img.oss-cn-shanghai.aliyuncs.com/ShopBanner/afc5265af3824e0db2a129935520efb9.png",
          text: "茶配件"
        }
      ]
    };
  },
  async mounted() {
    console.log(444);
    let { data } = await this.$axios.get("http://116.62.5.240:2020/list/");
    let goods = data.data[0].list;
    let isgood = [];
    // console.log(goods)
    // console.log(data.data[0].list[0].main[0].smalllist[0])
    for (let i = 0; i < goods.length; i++) {
      for (let j = 0; j < goods[i].main.length; j++) {
        for (let x = 0; x < goods[i].main[j].smalllist.length; x++) {
          isgood.push(goods[i].main[j].smalllist[x]);
        }
      }
    }
    // console.log(isgood)
    this.goods = isgood.slice(0, 10);
  }
};
</script>
  <style scoped="">
* {
  padding: 0;
  margin: 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.top {
  height: 1.375rem;
}
.header {
  width: 100%;
  height: 1.375rem;
  background-color: #ec1308;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 99;
}
.header .icon {
  font-size: 0.8rem;
  color: #fff;
}
.header input {
  width: 70%;
  height: 60%;
  border-radius: 1.25rem;
  padding-left: 0.625rem;
  boder: none;
}
.fenlei ul {
  margin: 0.625rem 0;
  display: flex;
  flex-wrap: wrap;
}
.fenlei ul li {
  width: 20%;
  height: 2.5rem;
  text-align: center;
}
.fenlei ul li img {
  width: 70%;
  height: 58%;
}
.fenlei ul li p {
  font-size: 0.5rem;
}
.goodlist {
  width: 96%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.goodlist dl {
  /* border: #000000 1px solid; */
  width: 44%;
  height: 5rem;
  padding: 0.25rem;
}
.goodlist dl dt {
  height: 70%;
  width: 100%;
}
.goodlist dl dt img {
  width: 100%;
  height: 100%;
}
.goodlist dl dd {
  width: 100%;
  height: 26%;
}
.title {
  height: 0.9rem;
  font-size: 0.3rem;
  overflow: hidden;
}
.goodlist dl dd .price {
  margin-right: 0.2rem;
  color: red;
  font-size: 0.5rem;
}
.foot {
  height: 1.4375rem;
}
</style>