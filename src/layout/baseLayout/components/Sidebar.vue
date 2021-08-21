<template>
  <div class="el-scrollbar">
    <!-- 侧边栏菜单区域 -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activeNav">
      <!-- 一级菜单 -->
      <el-submenu :index="item.url" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class=item.icon></i>
          <!-- 文本 -->
          <span>{{ item.name }}</span>
        </template>

        <!-- 二级菜单 -->
        <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.url)">
          <template slot="title">
            <!-- 图标 -->
            <i :class=subItem.icon></i>
            <!-- 文本 -->
            <span>{{ subItem.name }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters([
      'menuList',
      'sidebarOpen',
      'activeNav'
    ]),
    // 侧边栏是否展开
    isCollapse () {
      return this.sidebarOpen
    }
  },
  methods: {
    saveNavState (url) {
      store.dispatch('saveActiveNav', url)
    }
  }
}
</script>

<style lang="less" scoped>
.el-scrollbar {
  height: 100%;
  background-color: #333744;
}

.el-menu {
  border-right: 0;
}
</style>
