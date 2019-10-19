<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  padding: 0;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background-image: url(../../assets/i-category-icon-gray.png);
}
.bg-purple-light {
  background: #e5e9f2;
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