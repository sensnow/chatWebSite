<template>
  <div class="big">
    <div class="left">
        <LeftBox></LeftBox>
    </div>
    <div class="right">
      <Message />
      <SendMessage />
    </div>
  </div>
</template>

<script>


import LeftBox from "@/components/LeftBox.vue";
import Message from "@/components/Message.vue";
import SendMessage from "@/components/SendMessage.vue";

export default {
  name: "homeBox",
  components:{
    LeftBox,
    Message,
    SendMessage
  },
  mounted() {

  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.big{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  text-align: center;
}

.left {
  width: 16%;
  height: 80%;
  overflow: hidden;
  margin: 15px 30px 15px 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.right
{
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*display: flex;*/
  /*flex-direction: column;*/
}

</style>