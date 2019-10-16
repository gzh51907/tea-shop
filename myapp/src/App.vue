<template>
  <div id="app">

 <el-container>
      <!-- <el-header>
        <toubu />
      </el-header> -->

     <el-main>
      <router-view />
      </el-main>

    <el-footer id="footer">
        <div>
          <dibu />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import dibu from "./components/footer/footer.vue";
import toubu from "./components/toubu/toubu.vue";
import cneten from "./components/nav/nav.vue";
export default {
  components: {
    dibu,
    toubu,
    cneten
  },
  created(){
  	    this.$store.dispatch('checkLogin');	
  	  },
}

</script>

<style lang='scss' scoped>
.el-footer {
  width: 100%;
}
#footer {
  position: fixed;
  top: 36.5rem;
}
</style>
