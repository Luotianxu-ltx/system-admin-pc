<template>
  <div class="container">
    <div class="top">
      <ul>
        <li>首页</li>
        <li>发现</li>
        <li>服务</li>
        <li>加入我们</li>
        <li>更多</li>
      </ul>
    </div>
    <div class="box">
      <div class="title">
        <span class="loginTitle">{{ isLogin ? '登录' : '注册' }}</span>
        <span>/</span>
        <span class="registerTitle" @click="toggle">{{ isLogin === false ? '登录' : '注册' }}</span>
      </div>
      <div class="login">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFromRules" label-width="0px" class="login_form">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" clearable placeholder="用户名"
                      v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-unlock" show-password clearable placeholder="密码"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="repPassword" v-if="!isLogin">
            <el-input prefix-icon="el-icon-unlock" show-password placeholder="确认密码"
                      v-model="loginForm.repPassword"></el-input>
          </el-form-item>
          <div class="btn">
            <el-button class="btns" type="primary" v-if="isLogin" @click="login">登录</el-button>
            <el-button class="btns" type="primary" v-else @click="register">注册</el-button>
            <el-button class="btns" type="info" @click="resetLoginForm">重置</el-button>
            <!--            <el-button type="info" @click="refreshToken">重新获取令牌</el-button>-->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getUserByUsername, registerUser, getUserMenuList } from '@/api/auth'

export default {
  name: 'Login',
  data () {
    // 验证用户名是否已经注册
    const isUserNameCheck = (rule, value, callback) => {
      if (this.isLogin) {
        return callback()
      } else {
        getUserByUsername(value).then(res => {
          if (res.code !== 20000) {
            return callback(new Error('系统错误！请稍后重试！'))
          }
          if (res.data === true) {
            return callback(new Error('用户名已注册！'))
          }
          return callback()
        })
      }
    }
    return {
      // 判断是否为登录
      isLogin: true,
      loginForm: {
        username: '',
        password: '',
        repPassword: ''
      },
      loginFromRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          },
          {
            validator: isUserNameCheck,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        repPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 切换登录和注册
    toggle () {
      this.isLogin = !this.isLogin
      this.resetLoginForm()
    },
    // 重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          store.dispatch('UserLogin', this.loginForm).then(response => {
            if (response.code === 20000) {
              this.getMenu()
            } else {
              this.$message.error(response.message)
            }
          })
        }
      })
    },
    // 获取菜单列表
    async getMenu () {
      const uid = JSON.parse(this.$store.getters.userInfo).uid
      const res = await getUserMenuList(uid)
      if (res.code !== 20000) {
        await store.dispatch('UserLogout')
        return this.$message.warning(res.message)
      } else {
        this.$message.success('登录成功')
        await store.dispatch('GetUserMenu', res.data)
        await store.dispatch('saveActiveNav', '/info/dashboard')
        await this.$router.push('/info/dashboard')
      }
    },
    // 注册
    register () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { code, data } = await getUserByUsername(this.loginForm.username)
          if (code !== 20000) {
            this.$message.error('查询错误')
            return false
          }
          if (data) {
            this.$message.error('用户名已注册！')
            return false
          }
          await registerUser(this.loginForm).then(response => {
            const { code } = response
            if (code === 20000) {
              this.$message.success('注册成功')
              this.isLogin = true
              this.resetLoginForm()
            }
          })
        }
      })
    },
    refreshToken () {
      store.dispatch('SendRefreshToken').then(() => {
        this.$message.success('刷新成功')
      }).catch(() => {
        this.$message.error('您的身份已过期，请重新登录！')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
  background: url("../../assets/img/login/pexels-andy-vu-3244513.jpg");
  background-size: cover;

  .top {
    position: absolute;
    top: 5%;
    right: 10%;
    color: #fff;

    ul {
      li {
        float: left;
        margin-left: 80px;
        font-size: 20px;

        &:hover {
          color: #0d6efd;
          cursor: pointer;
          transform: translateY(2px);
        }
      }
    }
  }

  .box {
    position: absolute;
    right: 10%;
    top: 50%;
    width: 440px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px 40px;

    .title {
      margin-bottom: 20px;

      .loginTitle {
        font-size: 30px;
        font-weight: 800;
        margin-right: 5px;
      }

      .registerTitle {
        font-size: 15px;
        font-weight: 400;
        margin-left: 5px;

        &:hover {
          color: #0d6efd;
          cursor: pointer;
        }
      }
    }

    .login {

      .btn {
        display: flex;
        justify-content: flex-end;

        .btns {
          height: 33px;
          line-height: 9px;
        }
      }
    }
  }
}
</style>
