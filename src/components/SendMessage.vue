<template>
    <div class="main">
      <div class="input-box">
        <el-input  icon="el-icon-position"  autosize :min-height="30" :max-height="200" v-model="content">
          <el-button slot="append" icon="el-icon-position"></el-button>
        </el-input>
      </div>
    </div>
</template>

<script>


export default {
  name: "send-message",
  data()
  {
    return{
      content : ""
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  bottom: 0;
  border: 1px;
  border-radius: 15px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.input-box{
  border-radius: 5px; overflow: hidden;
}
</style>