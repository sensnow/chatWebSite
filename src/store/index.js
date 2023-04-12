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
        if(value===this.state.searchId)
        {
            return
        }
        if (value === null || value === '')
        {
            context.commit('storeMessages',[])
            context.commit('storeSearchId','')
            context.commit('storeNewChat', true);
            return
        }

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
    async sendAll(context,value) {
        const chat_msg = new Object({
            searchId: value.searchId,
            messages: this.state.messages,
        })
        const chatMsg = JSON.stringify(chat_msg)
        let flag = 0;

        if(this.state.socket == null || this.state.socket.readyState === WebSocket.CLOSED){
            this.state.scoket = null;
            this.state.socket = new WebSocket('wss://chat.wenshijiannan.cn/ws');
            // this.state.socket = new WebSocket('ws://127.0.0.1:8088/ws');
            // console.log("创建新socket")
            let role = '';
            let content = '';
            this.state.socket.addEventListener('message', event => {
                const eventData = event.data;
                if(eventData === "data: [DONE]"){
                    flag = 0;
                    let returnMsg = this.state.messages[this.state.messages.length - 1]
                    axios.post('/api/chat/saveConversation', {
                        searchId: value.searchId,
                        messages: [returnMsg,]
                    }).then((res) => {
                        // 关闭加载条
                        context.commit('storeSendingMessage', false)
                        this.state.downMarkdown = false;
                    }).catch((err) => {
                        context.commit('storeSendingMessage', false)
                        this.state.downMarkdown = false;
                        this.state.that.$message.error({
                            message: '网络错误',
                            type: 'error'
                        })
                    });
                }else {
                    this.state.downMarkdown = true;
                    let MsgData = eventData;
                    if(MsgData.indexOf('data: ') !== -1){
                        MsgData = MsgData.split('data: ')[1];
                        let message = JSON.parse(MsgData);
                        let choice = message.choices[0];
                        let delta = choice.delta;
                        let finish_reason = choice.finish_reason;
                        if(role === ''){
                            role = delta.role;
                        }else if (role !== ''){
                            content = delta.content;
                            if(content === undefined){
                                content = '';
                            }
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
                            // console.log(message);
                        }
                    }

                }
            });
            // 开始发送消息
            if(this.state.messages[this.state.messages.length-1].role === 'assistant'){
                this.state.messages.pop();
            }
            this.state.socket.addEventListener('open', event => {
                this.state.socket.send(chatMsg);
            });
        }else {
            if (this.state.socket.readyState === WebSocket.CLOSED) {
                this.state.that.$message.error({
                    message: '网络错误，请刷新当前页面',
                    type: 'error'
                })
                return;
            }
            // 如果连接失败,刷新页面
            if(this.state.messages[this.state.messages.length-1].role === 'assistant'){
                this.state.messages.pop();
            }
            this.state.socket.send(chatMsg);
        }
    },
    // 发送消息
    async sendMessage(context, value) {
        context.commit('addMessage', value.message);
        if(this.state.newChat){
            await axios.get('/api/chat').then((res) => {
                context.commit('changeSearchId',res.data.data)
                // context.commit('storeMessages', [])
                value.searchId = this.state.searchId;
            }).catch((err) => {
                this.state.that.$message.error({
                    message: '获取对话失败',
                    type: 'error'
                })
            })
        }
        await this.dispatch('sendAll',value)
    },
    async regenerateMessage(context,value) {
        await this.dispatch('sendAll',value)
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
    },
    storeShowRegenerate(state, value) {
        state.showRegenerate = value;
    }
}
//准备state——用于存储数据
const state = {
    conversationlist: [],
    messages: [],
    searchId: '',
    newChat: true,
    messageloading: false,
    sendingMessage: false,
    that: '',
    downMarkdown: false, // 接收数据时，下滑到最底部
    socket: null,
    showRegenerate: false,
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