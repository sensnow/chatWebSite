<template>
  <div>
    <div class="formdata">
      <el-form ref="form" :model="form" :rules="rules">
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
      </el-form>
    </div>
    <div class="tool">
      <div>
        <el-checkbox v-model="checked" @change="remember"
        >记住密码</el-checkbox
        >
      </div>
      <div>
        <span class="shou" @click="noAccount">没有账号，点我注册</span>
      </div>
    </div>
    <div class="butt">
      <el-button  :loading="loading" :disabled="loading"  type="primary" style="width: 40%" @click.native.prevent="login('form')"
      >登录</el-button>
    </div>
  </div>
</template>

<script>
// import { login } from "@/api/login";
// import { setToken } from "@/request/auth";
import axios from "axios";

const Base64 = require("js-base64").Base64
export default {

  name: "login-box",
  data() {

    return {
      form: {
        password: "",
        username: "",
      },
      loading: false,
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    let username = localStorage.getItem("username");
    if (username) {
      this.form.username = localStorage.getItem("username");
      this.form.password = Base64.decode(localStorage.getItem("password"));// base64解密
      this.checked = true;
    }
  },
  methods: {

    remember(){
      if (this.checked) {
        let password = Base64.encode(this.form.password); // base64加密
        localStorage.setItem("username", this.form.username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
    async login(form)
    {
      // 检验
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          await axios
              .post("/api/user/login", {
                userName: this.form.username,
                password: this.form.password,
              })
              .then((res) => {
                this.loading = false;
                if (res.data.code === 200) {
                  this.$message({
                    message: "登录成功",
                    type: "success",
                  });
                  this.$router.push(
                      {
                        path: "/home",
                      }
                  )
                } else {
                  this.$message({
                    message: "登录失败",
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                this.$message({
                  message: "无法连接至服务器",
                  type: "error",
                });
              });
        } else {
          this.$message({
            message: "请检查输入",
            type: "error",
          });
        }
      });
    },
    noAccount() {
      this.$router.push(
        {
          path: "/register",
        }
      )
    },
  },
};
</script>

<style scoped>
.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url(../assets/landscape.jpg);
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
  margin: 0;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
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

