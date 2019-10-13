<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="7.417rem">
        <ul class="aside_list">
          <li v-for="item in listnav" :key="item">{{item}}</li>
        </ul>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      listnav: [
        "黑茶",
        "白茶",
        "乌龙茶",
        "红茶",
        "绿茶",
        "花果茶",
        "茶具",
        "茶壶",
        "茶盘",
        "茶配件",
        "茶食品",
        "工艺品",
        "滋补养身",
        "机器配件",
        "茶家具",
        "黄茶"
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
.aside_list {
  width: 7.417rem;
  min-width: 7.417rem;
  padding-bottom: 0.167rem;
  li {
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    font-size: 1.083rem;
  }
}
</style>