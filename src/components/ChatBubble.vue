<template>
    <div :class="bubbleClass" @mouseenter="enter" @mouseleave="leave">
      <el-tooltip content="复制" placement="top" v-show="copy" :class="tool">
        <el-button icon="el-icon-document-copy" type="text" v-clipboard:copy="message"></el-button>
      </el-tooltip>
      <markdown-it-vue class="md-body" :content="message" id="markdown" />
    </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import message from "@/components/Message.vue";
import {mapState} from "vuex";

export default {
  data() {
    return {
      copy: false,
    };
  },
  components: {
    MarkdownItVue,
  },
  methods: {
    enter() {
      this.copy = true;

    },
    leave() {
      this.copy = false;
    },
  },
    props: {
        message: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true
        },
    },
    computed: {
        bubbleClass() {
            return this.role ==='user' ? 'user-bubble' : 'bot-bubble';
        },
        tool() {
            return this.role ==='user' ? 'user-tool' : 'bot-tool';
        },
    },
}
</script>

<style scoped>
.user-bubble {
    display: block;
    background-color: #3858D1;
    color: white;
    text-align: right;
    align-self: flex-end;
    max-width: 70%;
    border: 1px solid #e6e6e6;
}

.bot-bubble {
    background-color: #ffffff;
    text-align: left;
    align-self: flex-start;
    max-width: 70%;
    border: 1px solid #e6e6e6;
}

.user-bubble .markdown-body {
    color: white;
}

.bot-bubble .markdown-body {
    color: black;
}

/*靠近最右边*/
.bot-tool{
    position: relative;
    left: 95%;
    margin: 0;
    padding: 0;
}

.user-tool{
  position: relative;
  left: 5%;
  margin: 0;
  padding: 0;
}
</style>