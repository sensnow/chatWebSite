<template>
    <div :class="bubbleClass">
          <markdown-it-vue class="md-body" :content="message" />
    </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
export default {
  components: {
    MarkdownItVue,
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

</style>