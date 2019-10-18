<template>
  <div>
    <el-row :gutter="10">
      <el-col
        :xs="4"
        style="width: 19.66667%"
        v-for="item in menus"
        :key="item.name"
        @click="goto(item.path)"
      >
        <div class="grid-content bg-purple" @click="goto(item.path)">
          <div>
            <i :class="item.ic" style></i>
          </div>
          <div>{{item.text}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/list",
      menus: [
        {
          name: "home",
          path: "/home",
          text: "首页",
          // ic: "el-icshouye"
          ic: "el-icon-s-home"
        },
        {
          name: "list",
          path: "/list",
          text: "分类",
          ic: "el-icon-menu"
        },
        {
          name: "news",
          path: "/news",
          text: "消息",
          ic: "el-icon-chat-dot-square"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车",
          ic: "el-icon-shopping-cart-2"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的",
          ic: "el-icon-s-custom"
        }
      ]
    };
  },
  methods: {
    goto(activeIndex) {
      this.$router.push(activeIndex);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-size: 0.426667rem;
}
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  i {
    //  margin-top: .806667rem;
    text-align: center;
  }
}
.bg-purple-light {
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>