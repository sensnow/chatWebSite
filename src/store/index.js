//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import axios from "axios";

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
        }
        context.commit('addMessage', value.messages);
        const data = {
            searchId: this.$store.state.searchId,
            messages: this.$store.state.messages
        }
        await axios.post('/api/ws/connect',  { data: 'Hello WebSocket!' }).then(async res=>{
            const socket = new WebSocket("ws://localhost:8088/api/ws/connect");
            socket.addEventListener('open', event =>  {
                socket.send(JSON.stringify(data));
            });
            this.state.that.$message.success({
                message: '发送消息成功',
                type: 'success'
            })
            let flag = 0;
            socket.addEventListener('message', event => {
                const data = event.data;
                if(data === "[DONE]") {
                    socket.close();
                }else
                {
                    if(flag === 0){
                        const message = {
                            content: data.content,
                            role: data.role,
                        }
                        this.$store.state.messages.push(message);
                    }
                    this.$set(this.$store.state.messages[this.$store.state.messages.length-1],'content' , ''+this.$store.state.messages[this.$store.state.messages.length-1]+data.content);
                }
            })
            context.commit('addMessage', res.data.data)
            if(this.state.newChat){
                const response = await axios.get('/api/chat/conversationlist');
                context.commit('storeConversationlist', response.data.data);
            }
            context.commit('storeNewChat', false)
            context.commit('storeSendingMessage',false)
        }).catch((err) => {
            this.state.that.$message.error({
                message: '发送消息失败',
                type: 'error'
            })
        })
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