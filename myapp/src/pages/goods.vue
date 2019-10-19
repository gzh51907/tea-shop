<template>
  <div class="goods">
    <div class="goods_top">
      <div class="topone">
        <img v-on:click="toreturn" src="../assets/images/list/return.png" alt class="returnlist" />
        <h1 v-show="list_name">{{list_name}}</h1>
      </div>
      <div class="toptwo">
        <ul>
          <li
            v-for="(item, index) in list_list"
            :key="index"
            @click="getNum(index)"
            :class="{active:num==index}"
          >{{item}}</li>
        </ul>
      </div>
      <div class="topthree">
        <p
          v-for="(item,index) in check"
          :key="index"
          :class="{active:nums==index}"
          @click="getNums(index)"
        >{{item}}</p>
      </div>
    </div>
    <div class="goods_center">
      <div v-for="(item,index) in list_list_main" :key="index" v-show="index==num" class="guding">
        <div
          v-for="(items,index)  in item"
          :key="index"
          class="small_guding"
          @click="toxiang(items,items.gid)"
        >
          <img :src="items.photo" alt />
          <p class="pone">{{items.name}}</p>
          <p class="ptwo">
            <span class="baoyou">包邮</span>
            <span class="chandi">{{items.region}}</span>
          </p>
          <p class="pthree">
            <span class="price">￥{{items.price}}</span>
            <span class="fukuan">0人付款</span>
          </p>
        </div>
      </div>
    </div>
    <div class="goods_footer"></div>
  </div>
</template>
<script>
import "../assets/rem";
export default {
  data() {
    return {
      num: 0,
      nums: 0,
      list_name: "",
      list_id: "",
      list_list: [],
      chuanzou: "",
      list_list_main: [],
      check: ["综合", "销量", "价格", "筛选"]
    };
  },
  methods: {
    toxiang(items ,gid) {
      this.$router.push({
        path: "/xiang",
        query: { items: items, list_name: this.chuanzou ,gid:gid}
      });
    },
    toreturn() {
      this.$router.push({ name: "list" });
    },
    getlistlist(datas, list_name) {
      datas.forEach(item => {
        if (item.list === list_name) {
          this.list_name = item.title;
          item.main.forEach(items => {
            this.list_list.push(items.name);
            this.list_list_main.push(items.smalllist);
          });
        }
      });
    },
    getNum(index) {
      this.num = index;
    },
    getNums(index) {
      this.nums = index;
    },
    async getlistmain() {
      let { list_name, list_id } = this.$route.query;
      this.chuanzou = list_name;
      let { data } = await this.$axios.get("http://116.62.5.240:2020/list");
      let datas = data.data[0].list;

      this.getlistlist(datas, list_name);
    }
  },
  computed: {
    name() {
      return this.list_name;
    }
  },
  created() {
    this.getlistmain();
  },
  mounted() {}
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
.goods {
  background-color: #f4f4f4;
  .goods_top {
    position: fixed;
    top: 0;
    height: 3.2rem;
    width: 100%;
    background-color: #f4f4f4;
    .topone {
      img {
        width: 0.8rem;
        height: 0.8rem;
      }
      .returnlist {
        position: fixed;
        top: 0.306667rem;
        left: 0.266667rem;
      }
      h1 {
        height: 1.333333rem;
        line-height: 1.333333rem;
        background-color: #fff;
        text-align: center;
        font-size: 0.48rem;
        font-weight: 100;
      }
    }
    .toptwo {
      margin-top: .053333rem;
      height: 0.933333rem;
      background-color: #fff;
      overflow: auto;
      width: 23.333333rem;
      ul {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        li {
        text-align: center;
          line-height: 100%;
          font-size: 0.426667rem;
          padding: 0 0.266667rem;
        }
      }
    }
    .topthree {
      display: flex;
      font-size: 0.373333rem;
      p {
        flex: 1;
        text-align: center;
        background-color: #f4f4f4;
        line-height: 0.933333rem;
      }
    }
  }
  .goods_center {
    background-color: #f4f4f4;
    position: fixed;
    top: 3.2rem;
    bottom: 1.12rem;
    width: 100%;
    overflow: auto;
    .guding {
      padding-left: 0.266667rem;
      .small_guding {
        width: 46%;
        float: left;
        height: 7.2rem;
        margin-right: 0.266667rem;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 0.106667rem;
        img {
          width: 100%;

          border-radius: 10px 10px 0 0;
          height: 4.533333rem;
        }
        .pone {
          padding: 0 0.106667rem;
          font-size: 0.373333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          width: 100%;
          box-sizing: border-box;
          -webkit-box-orient: vertical;
        }
        .ptwo {
          display: flex;
          padding: 0.106667rem 0.106667rem;
          justify-content: space-between;
          margin-top: 0.106667rem;
          .baoyou {
            border: 1px solid red;
            border-radius: 0.266667rem;
            color: red;
            font-size: 0.266667rem;
            padding: 0 0.106667rem;
          }
          .chandi {
            font-size: 0.346667rem;
            padding: 0 0.106667rem 0 0;
          }
        }
        .pthree {
          padding: 0.106667rem 0.106667rem;
          .price {
            color: red;
            font-size: 0.373333rem;
            margin-right: 0.106667rem;
          }
          .fukuan {
            color: #8f8f8f;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
  .goods_footer {
    position: fixed;
    bottom: 0;
    height: 1.12rem;
    width: 100%;
  }
}
</style>