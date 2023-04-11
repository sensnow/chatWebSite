<template>
  <div class="main">
    <vue-scroll v-loading="messageloading" ref="vs" :ops="ops"  vuescroll   @handle-resize="handleResize">
        <div class="chat-window">
          <ChatBubble
              v-for="(msg,index) in messages"
              :key="index"
              :message="msg.content"
              :role="msg.role"
          />
        </div>
    </vue-scroll>
    <transition name=".el-zoom-in-center">
      <el-button class="regenerate" :disabled="this.$store.state.sendingMessage" icon="el-icon-refresh" v-show="this.$store.state.messages.length!==0" @click="regenerateBtn()" >Regenerate response</el-button>
    </transition>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import vuescroll from "vuescroll";
import axios from "axios";
import Vue from "vue";
import sendMessage from "@/components/SendMessage.vue";
import ElementUI from "element-ui";

export default {
  components:{
    vuescroll,
    ChatBubble: () => import('@/components/ChatBubble.vue')
  },
  data(){
    return{
      userInput: "",
      sendDisabled: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          opacity: 0,
        }
      },
      isAble: false,
  }
  },

  name: "message-box",
  computed: {
    ...mapState(['messages','messageloading','downMarkdown','showRegenerate','searchId','sendingMessage']),
  },
  methods:{
    async regenerateBtn()
    {

      if(this.$store.state.sendingMessage === true){
        return
      }
      this.$store.commit('storeSendingMessage',true);

      let object = {
        searchId: this.searchId,
      }
      console.log(this.$store.state.sendingMessage);

      await this.regenerateMessage(object);
      // this.$store.commit('storeSendingMessage',false);
    },
    handleResize() {
      this.$nextTick(() => {
        if(this.$store.state.downMarkdown===true)
        {
          this.$refs.vs.scrollTo({
                y: 10000000
              },
              1000
          )
        }
      })
    },
  ...mapActions(['regenerateMessage'])
  },
  mounted() {
    this.$store.state.messages = [];
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
  overflow: hidden;
  border-radius: 12px;
  margin: 0 0 0 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}


.chat-window {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 5%;
  box-sizing: border-box;
}

.input-container {
  display: flex;
  width: 80%;
  height: 10%;
  justify-content: space-between;
  margin-top: 1rem;
}

input {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
}

button {
  background-color: #4e73df;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 1rem;
}

button:hover {
  background-color: #2e59d9;
}

.user-bubble, .bot-bubble {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  max-width: 60%;
  word-wrap: break-word;
}


.user-bubble .markdown-body {
    color: white !important
}

.bot-bubble .markdown-body {
    color: black !important;
}

.user-bubble .md-body {
    color: white !important;
}

.bot-bubble .md-body {
    color: black !important;
}
.regenerate{
  position: relative;
  bottom: 7%;
  background-color: rgba(255,255,255);;
  color: rgba(64,65,79);
  border: 1px solid rgba(0,0,0,.1);
  font: 1px black solid;
  font-family: "Microsoft YaHei",serif;
}
.regenerate:hover{
  background: lightgray;
}

</style>