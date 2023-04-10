<template>
    <el-form @submit="send" class="main" :rules="rules" @submit.n.native.prevent @keyup.enter="send">
            <el-input type="text" v-loading="sendingMessage" :disabled="sendingMessage" prop="content" class="input-box" v-model.trim="content" />
            <el-button native-type="submit" class="submit_btn" icon="el-icon-position" @click="send" />
    </el-form>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import Vue from "vue";

export default {
    name: "send-message",
    data() {
        return {
            content: "",
            rules:{
                content: [
                    { required: true, message: "请输入内容", trigger: "blur" },
                ],
            }
        }
    },
  beforeDestroy() {
    this.$store.state.socket.close();
  },

  computed:{
       ...mapState(['searchId','newChat','sendingMessage'])
    },
    methods: {
        ...mapActions(['sendMessage','getConversationlist']),
        async send() {

            if(this.content == null || this.content.trim() === '')
            {
                this.$message({
                    message: '请输入内容',
                    type: 'warning'
                });
                return
            }
            if(this.searchId==='')
            {
              this.$store.commit('storeNewChat',true);
            }

            this.$store.commit('storeSendingMessage',true);
            await this.sendMessage({
              searchId: this.searchId,
              message:{
                content: this.content,
                role: "user"
              }
            })
            this.content = ''
            this.$store.state.newChat = false;
            await this.getConversationlist();
        }

    }


}
</script>

<style scoped>


.main {
    display: flex;
    flex-direction: row;
    height: fit-content;
    max-width: 100%;
    width: 100%;
    bottom: 0;
    border: 1px;
    border-radius: 5px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.input-box {
    display: inline-block;
    width: 95%;
}

.submit_btn {
    background-color: #2e59d9;
    color: white;
    display: block;
    width:5%;
}



</style>