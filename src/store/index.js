//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import axios from "axios";
import message from "@/components/Message.vue";

//应用Vuex插件
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {
    /* jia(context,value){
        console.log('actions中的jia被调用了')
        context.commit('JIA',value)
    },
    */
    // 请求列表数据数据
    async getConversationlist(context)
    {
        await axios.get('/api/chat/conversationlist').then((res) =>{
            context.commit('storeConversationlist',res.data.data)
        }).catch((err) => {
            this.state.that.$message.error(err)
        })
    },
    // 删掉会话
    async deleteConversation(context, value) {
        await axios.delete('/api/chat/conversation', {
            params: {
                searchId: value
            }
        }).then(async (res) => {
            const response = await axios.get('/api/chat/conversationlist');
            context.commit('storeConversationlist', response.data.data);
        }).catch((err) => {
            this.state.that.$message.error({
                message: '删除对话失败',
                type: 'error'
            })
        });
    },
    // 请求消息数据
    async getMessages(context,value)
    {
        context.commit('storeMessageloading', true)
        context.commit('storeSearchId', value);
        context.commit('storeNewChat', false);
        await axios.get('/api/chat/conversation', {
            params: {
                searchId: value
            }
        }).then((res) => {
            context.commit('storeMessages', res.data.data)
            context.commit('storeMessageloading', false)
        }).catch((err) => {
            this.state.that.$message.error({
                message: '获取对话失败',
                type: 'error'
            })
        });

    },
    // 发送消息
    async sendMessage(context, value) {

        if(this.state.newChat){
            await axios.get('/api/chat').then((res) => {
                context.commit('changeSearchId',res.data.data)
                context.commit('storeMessages', [])
                value.searchId = this.state.searchId;
            }).catch((err) => {
                this.state.that.$message.error({
                    message: '获取对话失败',
                    type: 'error'
                })
            })
        }
        context.commit('addMessage', value.message);

        console.log(value);
        console.log(this.state)
        const chat_msg = new Object({
            searchId: value.searchId,
            messages: this.state.messages,
        })

        const chatMsg = JSON.stringify(chat_msg)

        console.log(chatMsg);
        axios.post('/api/ws/connect', { data: 'Hello WebSocket!' })
            .then(response => {
                const socket = new WebSocket('ws://localhost:8088/ws?sessionId=' + response.data.data)
                socket.addEventListener('open', () => {
                    socket.send(chatMsg);
                    console.log(socket);
                    console.log('WebSocket connected')
                });
                let flag = 0;
                let role = '';
                let content = '';
                socket.addEventListener('message', event => {
                    const eventData = event.data;
                    if(eventData === "data: [DONE]"){
                        socket.close();
                    }else {
                        let MsgData = eventData;
                        if(MsgData.indexOf('data: ') !== -1){
                            MsgData = MsgData.split('data: ')[1];
                            let message = JSON.parse(MsgData);
                            let choice = message.choices[0];
                            let delta = choice.delta;
                            // console.log(choice);
                            let finish_reason = choice.finish_reason;
                            if(role === ''){
                                console.log(delta)
                                role = delta.role;
                            }else if (role !== ''){
                                content = delta.content;
                                message = new Object({
                                    content: content,
                                    role: role,
                                })
                                if(flag++ === 0){
                                    this.state.messages.push(message);
                                }else {
                                    if(message.content !== undefined){
                                        this.state.messages[this.state.messages.length - 1].content+=message.content;
                                    }
                                }
                                console.log(message);
                            }
                        }

                    }
                });
                socket.onclose = function (event) {
                    console.log('WebSocket closed')
                }
            })
            .catch(error => {
                console.error(error)
            });

    },
    async deleteAllConversation(context) {
        await axios.delete('/api/chat/allconversation').then(async (res) => {
            context.commit('storeConversationlist', [])
            context.commit('storeMessages', [])
            context.commit('storeSearchId', '')
        }).catch((err) => {
            this.state.that.$message.error({
                message: '删除对话失败',
                type: 'error'
            })
        });
    },
    async getNewConversation(context) {
        context.commit('storeMessages', [])
        context.commit('storeNewChat', true)
    },
    async logout(){
        await axios.get('/api/user/logout').then((res) => {
            this.state.that.$router.push('/login')
        }).catch((err) => {
            this.state.that.$message.error({
                message: '登出失败',
                type: 'error'
            })
        })
    }

}
//准备mutations——用于操作数据（state）
const mutations = {
    storeConversationlist(state, value) {
        state.conversationlist = value;
    },
    storeMessages(state, value) {
        state.messages = value;
    },
    addMessage(state, value) {
        state.messages.push(value);
    },
    storeSearchId(state, value) {
        state.searchId = value;
    },
    changeSearchId(state, value) {
        state.searchId = value;
    },
    storeNewChat(state, value) {
        state.newChat = value;
    },
    storeMessageloading(state, value) {
        state.messageloading = value;
    },
    storeSendingMessage(state, value) {
        state.sendingMessage = value;
    },
    storeThat(state, value) {
        state.that = value;
    }
}
//准备state——用于存储数据
const state = {
    conversationlist: [],
    messages: [],
    searchId: '',
    newChat: false,
    messageloading: false,
    sendingMessage: false,
    that: ''
}

const getters = {
    getConversationlist: state => {
        return state.conversationlist;
    }
};

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})