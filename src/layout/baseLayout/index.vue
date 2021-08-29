<template>
  <div class="app">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <Sidebar></Sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <UserSetting></UserSetting>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from './components/Sidebar'
import UserSetting from './components/UserSetting'

export default {
  name: 'index',
  components: {
    Sidebar,
    UserSetting
  },
  computed: {
    ...mapGetters([
      'sidebarOpen'
    ]),
    // 侧边栏是否展开
    isCollapse () {
      return this.sidebarOpen
    }
  }
}
</script>
