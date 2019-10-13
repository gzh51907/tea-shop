<template>
  <div id="app">
   
     <router-view />
     
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
  }
};
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
