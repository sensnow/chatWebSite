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
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import vuescroll from "vuescroll";
import axios from "axios";
import Vue from "vue";
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
      }
  }
  },

  name: "message-box",
  computed: {
    ...mapState(['messages','messageloading']),
  },
  methods:{
    handleResize() {
      this.$nextTick(() => {
        this.$refs.vs.scrollTo({
          y: 10000000
        },
         1000
        )
      })
    },

  },
  mounted() {
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

</style>