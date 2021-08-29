<template>
  <div class="header">
    <div class="togSideBar">
      <i :class="sidebarOpen === false ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="toggleSideBar"></i>
    </div>
    <div class="right">
      <Screenfill class="item" id="screenFull"></Screenfill>

      <div class="userImg">
        <img :src=img class="user-avatar" alt="">
      </div>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link" >
          <span class="userName">{{ name }}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
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
      store.dispatch('toggleSideBar')
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
  padding: 0 10px;
  margin: 0;
  border-bottom: 1px solid #ccc;
  background-color: #333744;

  .togSideBar {
    i {
      font-size: 20px;
      color: #e4e5e6;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .item {
      padding: 0 10px;
      color: #e4e5e6;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
    }

    .userName {
      font-size: 15px;
      color: #e4e5e6;
      font-weight: 500;
    }
  }

}
</style>
