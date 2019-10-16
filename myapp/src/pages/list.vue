<template>
  <div class="list">
    <div class="top">1</div>
    <div class="center">
      <div class="aside">
        <li
          class="lists"
          v-for="item in listmain"
          :key="item.title"
          v-on:click="tocsoll(item.title)"
        >{{item.title}}</li>
      </div>
      <div class="main" id="gundong">
        <ul v-for="item in listmain" :key="item.title">
          <h2>{{item.title}}</h2>
          <li v-for="items in item.main" :key="items.id" v-on:click="togoods(item.list,items.id)">
            <img :src="require(`../assets/images/list/${items.url}`)" alt />
            <i>{{items.name}}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">4</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // main列表
      listmain: [],
      idex: 1
    };
  },
  async created() {
    // 数据库初始渲染main列表
    let { data } = await this.$axios.get("http://localhost:8080/list");
    let datas = data.data[0].list;
    this.listmain.push(...datas);
  },
  methods: {
    // 点击列表分类，main跳转到顶部
    tocsoll(val) {
      let gundong = document.querySelector("#gundong");
      this.listmain.forEach(item => {
        if (val === "黑茶") {
          gundong.scrollTo(0, 0);
        } else if (val === "白茶") {
          gundong.scrollTo(0, 210);
        } else if (val === "乌龙茶") {
          gundong.scrollTo(0, 510);
        } else if (val === "红茶") {
          gundong.scrollTo(0, 820);
        } else if (val === "绿茶") {
          gundong.scrollTo(0, 1130);
        } else if (val === "花果茶") {
          gundong.scrollTo(0, 1527);
        } else if (val === "茶具") {
          gundong.scrollTo(0, 1740);
        } else if (val === "茶壶") {
          gundong.scrollTo(0, 2040);
        } else if (val === "茶盘") {
          gundong.scrollTo(0, 2350);
        } else if (val === "茶配件") {
          gundong.scrollTo(0, 2658);
        } else if (val === "茶食品") {
          gundong.scrollTo(0, 2871);
        } else if (val === "茶工艺") {
          gundong.scrollTo(0, 3000);
        } else if (val === "滋补养生") {
          gundong.scrollTo(0, 3180);
        } else if (val === "机器配件") {
          gundong.scrollTo(0, 3180);
        } else if (val === "茶家具") {
          gundong.scrollTo(0, 3180);
        } else if (val === "黄茶") {
          gundong.scrollTo(0, 3180);
        }
      });
    },
    handleScroll() {
      let main_totop = gundong.scrollTop;
      if (main_totop > 1 && main_totop < 210) {
        this.tochange(1);
      } else if (main_totop >= 210 && main_totop < 510) {
        this.tochange(2);
      } else if (main_totop >= 510 && main_totop < 820) {
        this.tochange(3);
      } else if (main_totop >= 820 && main_totop < 1130) {
        this.tochange(4);
      } else if (main_totop >= 1130 && main_totop < 1527) {
        this.tochange(5);
      } else if (main_totop >= 1527 && main_totop < 1740) {
        this.tochange(6);
      } else if (main_totop >= 1740 && main_totop < 2040) {
        this.tochange(7);
      } else if (main_totop >= 2040 && main_totop < 2350) {
        this.tochange(8);
      } else if (main_totop >= 2350 && main_totop < 2658) {
        this.tochange(9);
      } else if (main_totop >= 2658 && main_totop < 2871) {
        this.tochange(10);
      } else if (main_totop >= 2871 && main_totop < 3000) {
        this.tochange(11);
      } else if (main_totop >= 3000 && main_totop < 3180) {
        this.tochange(12);
      } else if (main_totop >= 3180) {
        this.tochange(13);
      } else if (main_totop <= 1) {
        this.tochange(0);
      }
    },
    togoods(list, id) {
      this.$router.push({
        path: "/goods",
        query: { list_name: list, list_id: id }
      });
    },
    tochange(id) {
      var listchange = document.getElementsByClassName("lists");
      for (var i = 0; i < listchange.length; i++) {
        if (i === id) {
          listchange[i].style = "color:red";
        } else {
          listchange[i].style = "color:black";
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.active {
  color: red;
}
.list {
  background-color: #f4f4f4;
  .top {
    position: fixed;
    top: 0;
    height: 0.533333rem;
  }
  .center {
    margin-top: 0.8rem;
    display: flex;
    height: 16.186667rem;
    .aside {
      width: 25%;
      li {
        width: 100%;
        height: 0.986667rem;
        font-size: 0.373333rem;
        text-align: center;
        line-height: 0.986667rem;
        background-color: #fff;
        margin-top: 2px;
        color: #464646;
      }
    }
    .main {
      width: 75%;
      overflow: auto;

      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        h2 {
          width: 100%;
          margin-left: 10px;
          line-height: 0.8rem;
        }
        li {
          width: 2.186667rem;
          height: 2.186667rem;
          margin-left: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          position: relative;
          img {
            width: 100%;

            border-radius: 5px;
          }
          i {
            display: inline-block;
            left: 0.5rem;
            position: absolute;
            bottom: 5px;
            font-size: 0.293333rem;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    height: 0.533333rem;
  }
}
</style>