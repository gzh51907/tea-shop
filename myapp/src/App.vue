<template>
  <div id="app">
    <div>
      <router-view />
    </div>
    <div class="foot">
      <dibu />
    </div>
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
  created() {
    this.$store.dispatch("checkLogin");
  }
};
</script>

<style lang='scss' scoped>
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #ccc;
  // display: flex;
  // justify-content: center;
  // align-items: center
}
</style>
