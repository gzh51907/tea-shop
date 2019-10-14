<template>
  <div class="goods">
    <div class="goods_top">
      <img class="return" v-on:click="toreturn" src="../assets/images/list/return.png" alt />
    </div>
    <div class="goods_center">中间</div>
    <div class="goods_button">底部</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list_name: "",
      list_id: ""
    };
  },
  methods: {
    async getlist(list_name, list_id) {
      let data = await this.$axios.get("http://localhost:8080/list/check", {
        params: {
          list_name,
          list_id
        }
      });
      console.log(data);
    },
    toreturn() {
      this.$router.push({ name: "list"})
    }
  },
  async created() {
    let { list_name, list_id } = this.$route.params;
    this.list_name = list_name;
    this.list_id = list_id;
    this.getlist(list_name, list_id);
  }
};
</script>
<style lang="scss" scoped>
.goods {
  background-color: #f4f4f4;
  .goods_top {
    position: fixed;
    top: 0;
    height: 1.333333rem;
    .return {
      position: fixed;
      top: 0.213333rem;
      left: 0.106667rem;
    }
  }
  .goods_center {
    margin-top: 1.333333rem;
    display: flex;
    height: 16.186667rem;
  }
  .goods_bottom {
    position: fixed;
    bottom: 0;
    height: 0.533333rem;
  }
}
</style>