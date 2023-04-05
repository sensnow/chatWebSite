<template>
  <div class="main">
    <div class="newChatBox">
        <i class="el-icon-plus"></i>
        <span style="margin-left: 10px">New Chat</span>
    </div>
    <div class="scrollbox">
      <vue-scroll>
        <h1 v-for="n in 100" :key="n">{{n}}</h1>
      </vue-scroll>
    </div>
    <div class="functionBox">
       <div>
         <i class="el-icon-delete"></i>
         <span style="margin-left: 10px">Clear All Conversation</span>
       </div>
       <div>
        <i class="el-icon-switch-button"></i>
        <span style="margin-left: 10px" >Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "left-box",
  vuescroll:{
    mode: 'native',
    locking: true,
    detectResize: true,
    maxHeight: 10
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main{
  height: 100%;
  padding: 10px;
  text-align: center;
}
.newChatBox {
  background: #87ceeb;
  text-align: center;
  line-height: 40px;
  margin: 10px 10px;
  border: 1px;
  border-radius: 12px;
  height: 40px;
}
.newChatBox:hover {
  background: #48b4e0;
}
.scrollbox{
  height: 75%;
}

.functionBox{
  width: 100%;
  height: 10%;
  margin-top: 15px;
  border: 1px;
  border-radius: 12px;
}
.functionBox div{
  width: 100%;
  height: 30px;
  margin: 10px 0;
  line-height: 30px;
  border: 1px black;
  border-radius: 12px;
  background-color: #fff;
}
</style>