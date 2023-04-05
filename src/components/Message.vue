<template>
  <div class="main">
    <vue-scroll>
      <h1 v-for="n in 100" :key="n">{{n}}</h1>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: "message-box",
  vuescroll:{
    mode: 'native',
    locking: true,
    detectResize: true,
  }
}
</script>

<style scoped>
.main{
  padding: 0;
  width: 100%;
  height: 90%;
  top: 0;
  border: 1px;
  border-radius: 12px;
  margin: 0 0 0 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>