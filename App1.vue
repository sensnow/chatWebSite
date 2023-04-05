<template>
    <div id="app">
        <div class="chat-window">
            <ChatBubble
                v-for="(msg,index) in messages"
                :key="index"
                :message="msg"
                :from-user="msg.fromUser"
            />
        </div>
        <form @submit="sendMessage" class="input-container">
            <input type="text" v-model="userInput" :disabled="sendDisabled"/>
            <button type="submit" :disabled="sendDisabled">发送</button>
        </form>
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
        async sendMessage(e) {
            e.preventDefault();
            if (!this.userInput) return;

            const userMessage = {
                text: this.userInput,
                fromUser: true,
            };
            this.messages.push(userMessage)
            this.userInput = "";
            this.sendDisabled = true;
            setTimeout(() => {
                this.sendDisabled = false;
            }, 3000);

            const response = await this.fetchResponse(userMessage.text);
            const botMessage = {
                text: response,
                fromUser: false,
            };
            botMessage.text = botMessage.text.replace("\n", "");
            this.messages.push(botMessage);
        },


        async fetchResponse(message) {
            this.prompt.push({"role": "user", "content": message});
            // let serHost = "/chat";
            // const apiClient = axios.create({
            //     // 在服务器启动时设置为服务器ip地址
            //     baseURL: process.env.VUE_APP_SERVER_IP,
            // });
            const response = await axios.post('http://' + process.env.VUE_APP_SERVER_IP + ":8081/chat", this.prompt);
            console.log(response)
        },
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
