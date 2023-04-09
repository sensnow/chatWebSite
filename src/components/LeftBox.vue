<template>
  <div class="main">
    <div id="border_btn">
      <div class="newChatBox" @click="newChat">
        <i class="el-icon-plus"></i>
        <span style="margin-left: 10px">New Chat</span>
      </div>
    </div>
    <div class="scrollbox">
      <v-subheader>CONVERSATIONS</v-subheader>
      <vue-scroll ref="vs" :ops="ops" v-loading="loading" >
          <v-list rounded dense>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(item, i) in reverseConversationlist" :key="item.searchId" @click.stop="getMessages(item.searchId)">
                <v-list-item-content>
                  <v-list-item-title v-text="">{{item.describe|silce}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon @click="deleteConversationMethod(item.searchId)">
                  <i class="el-icon-delete" style="align-self: center;align-items: center"></i>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </vue-scroll>
    </div>
    <div class="functionBox">
       <div @click.prevent="deleteAllConversationMethod">
         <i class="el-icon-delete"></i>
         <span style="margin-left: 10px">Clear All Conversation</span>
       </div>
        <div @click.prevent="logout">
        <i class="el-icon-switch-button"></i>
        <span style="margin-left: 10px" >Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import vuescroll from "vuescroll";
export default {
  components: {
    vuescroll,
    }, //在组件内注册
  name: "left-box",
  data(){
    return {
      item: null,
      loading: false,
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
  filters:{
    silce(value)
    {
      console.log(value)
      if (value.length > 10) {
        return value.toString().substring(0, 10) + '...'
      } else {
        return value.toString()
      }
    },
  },
  methods:{
    newChat()
    {
      this.item = 1;
      this.$store.state.conversationlist.push({
        searchId: '',
        describe: 'new chat',
        messages: []
      })
      this.getNewConversation();
    },
    deleteConversationMethod(searchId) {
      this.$confirm('此操作将删除该对话', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteConversation(searchId);
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
    });
    },
    deleteAllConversationMethod() {
      this.$confirm('此操作将删除全部对话', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAllConversation();
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async getConversationlistMethod() {
      this.loading = true;
      await this.getConversationlist();
      this.loading = false;
    },
    ...mapActions(['deleteConversation','getConversationlist','getMessages','getNewConversation','deleteAllConversation','logout']),
  },
  computed:{
    reverseConversationlist() {
      return this.conversationlist.reverse();
    },
    ...mapState(['conversationlist']),
  },
  mounted() {
    this.getConversationlistMethod();
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main{
  height: 100%;
  padding: 5px;
  text-align: center;
}
.newChatBox {
  background: #2e59d9;
  color: white;
  text-align: center;
  cursor: pointer;
  line-height: 35px;
  margin: 10px 0;
  border: 1px;
  border-radius: 5px;
  height: 35px;
}
.scrollbox{
  height: 75%;
  overflow: hidden;
}

.functionBox{
  width: 100%;
  height: 10%;
  margin-top: 15px;
  border: 1px;
  border-radius: 12px;
}
.functionBox div{
  width: 100%;
  height: 30px;
  display: block;
  margin: 5px 0;
  line-height: 30px;
  border: 1px black solid;
  border-radius: 5px;
}
.functionBox div:hover{
  background: black;
  color: white;
  cursor: pointer;
}
#border_btn{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
}

.newChatBox {
  border: 0;
  cursor: pointer;
  width: 70%;
  height: 35px;
  line-height: 35px;
  position: relative;
  justify-self: center;
  align-self: center;
  border-radius: 10px;
  background: #2ec4b6;
  text-transform: uppercase;
  color: white;
  font-size: 8px;
  font-weight: bold;
  padding: 4px 6px;
  outline: none;
  transition: border-radius 3s;
  -webkit-transition: border-radius 3s;
}

.newChatBox:hover {
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>