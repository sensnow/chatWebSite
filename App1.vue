<template>
    <div id="app">

    </div>

</template>

<script>
import axios from "axios";
import ChatBubble from "@/components/ChatBubble.vue";

export default {
    name: 'App',
    components: {
        ChatBubble
    },
    data() {
        return {
            messages: [],
            userInput: "",
            sendDisabled: false,
            prompt: [{"role": "system", "content": "你是一个有用的助手"}]
        }
    },
    methods: {

    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

.chat-window {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    height: 70%;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 1rem;
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
