<template>
  <div class="el-scrollbar">
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      :unique-opened="false"
      :collapse=isCollapse
      :collapse-transition="false"
      mode="vertical"
      router>
      <SidebarItem v-for="route in menuList" :key="route.id" :item="route"></SidebarItem>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'menuList',
      'sidebarOpen'
    ]),
    // 侧边栏是否展开
    isCollapse () {
      return this.sidebarOpen
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.el-scrollbar {
  height: 100%;
  background-color: #333744;
}
</style>
