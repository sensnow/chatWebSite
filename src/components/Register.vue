<template>
  <div>
    <div class="formdata">
      <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="login('form')">
        <el-form-item prop="username">
          <el-input
              v-model="form.username"
              clearable
              placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
          ></el-input>
        </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input
                v-model="form.checkPassword"
                clearable
                placeholder="请再次输入密码"
                show-password
            ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool">
      <div>
        <span class="shou" @click="haveAccount">已有账号，点此登录</span>
      </div>
    </div>
    <div class="butt">
      <el-button :loading="loading" :disabled="loading" type="primary" style="width: 40%" @click.native.prevent="register('form')"
      >注册</el-button>
    </div>
  </div>
</template>

<script>
// import { login } from "@/api/login";
// import { setToken } from "@/request/auth";
import axios  from "axios";
import {waitFor} from "@babel/core/lib/gensync-utils/async";
export default {

  name: "register-box",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword');
        }
        callback();
      }
    }
    let validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length > 10) {
        callback(new Error('用户名不能大于10个字符'));
      }else if (value.length < 4) {
        callback(new Error('用户名不能小于4个字符'));
      }
      // 判断是否有同名
      axios.post("/api/user/checkUserName",{
        userName: value,
      }).then(res => {
        if (res.data.code === 200) {
          callback();
        }else {
          callback(new Error('用户名已存在'));
        }
      })
    }
    return {
      form: {
        password: "",
        username: "",
        checkPassword: "",
      },
      loading: false,
      checked: false,
      rules: {
        username: [{
          validator : validateUsername,
          trigger : 'blur'
        }],
        password:[{validator: validatePass, trigger: 'blur'}],
        checkPassword:[{validator: validateCheckPassword, trigger: 'blur'}]
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.form.resetFields();
    });
  },
  methods: {
    async register(form)
    {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 3000);
          await axios.post("/api/user/register",{
            userName: this.form.username,
            password: this.form.password,
            checkPassword: this.form.checkPassword,
          }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push(
                  {
                    path: "/user/login",
                  }
              )
            }else {
              this.$message({
                message: '注册失败',
                type: 'error'
              });
            }
          }).catch(err => {
            this.$message({
              message: '无法连接至服务器',
              type: 'error'
            });
          });
          this.loading = false;
        } else {
          this.$message({
            message: '请检查输入',
            type: 'error'
          });
          return false;
        }
      });
    },
    haveAccount() {
      this.$router.push(
          {
            path: "/user/login",
          }
      )
    },
  },
};
</script>

<style scoped>


.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
  flex-direction: row-reverse;
}

.butt {
  margin-top: 10px;
  text-align: center;

}

.shou {
  cursor: pointer;
  color: #606266;
  font-size: 11px;
}


/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>

