<template>
  <div class="header">
    <div class="togSideBar">
      <Icon :icon="sidebarOpen === false ? 'muluzhankai' : 'mulushousuo'" @click.native="toggleSideBar"></Icon>
    </div>
    <div class="right">
      <Screenfill class="item line" id="screenFull"></Screenfill>

      <div class="userImg">
        <img src="../../../assets/img/17e2f2f4c273bcf288d7193810557d80.jpeg" class="user-avatar" alt="">
      </div>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="user">
            <div>
              <div class="userName">{{ name }}</div>
              <div class="role">超级管理员</div>
            </div>
            <Icon icon="xiangxia" font="16"></Icon>
          </div>

        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="userCenter()">个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Screenfill from '@/components/Screenfill'

export default {
  name: 'UserSetting',
  components: {
    Screenfill
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'sidebarOpen'
    ])
  },
  data () {
    return {
      name: '',
      img: ''
    }
  },
  mounted () {
    const userInfo = JSON.parse(this.userInfo)
    this.name = userInfo.username
    this.img = userInfo.imageUrl
  },
  methods: {
    logout () {
      this.$confirm('是否确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('UserLogout')
        this.$router.push('/auth')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    toggleSideBar () {
      console.log(9999)
      store.dispatch('toggleSideBar')
    },
    userCenter () {
      this.$router.push('/info/user')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  margin: 0;
  border-bottom: 1px solid #ccc;
  background-color: #fff;

  .togSideBar {
    i {
      font-size: 22px;
      color: #252323;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .item {
      padding: 0 10px;
      color: #e4e5e6;
    }

    .line {
      border-right: 1px solid #ccc;
    }

    .userImg {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 0 solid #e5e5e5;
      overflow: hidden;
      margin-left: 10px;
    }

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 0 solid #e5e5e5;
    }

    .user {
      display: flex;
      align-items: center;
      text-align: center;
      margin-left: 5px;

      .userName {
        font-size: 17px;
        color: #413c3c;
        font-weight: 500;
      }

      .role {
        font-size: 13px;
        color: #a9a8a8
      }
    }
  }

}
</style>
