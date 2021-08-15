<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>
          后台管理系统
        </span>
      </div>
      <el-button>退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse=isCollapse
          :collapse-transition="false"
          router>
          <el-submenu :index=item.url v-for="item in list" :key="item.id">
            <template slot="title">
              <i :class=item.icon></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :index=subItem.url v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i :class=subItem.icon></i>
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      list: '',
      isCollapse: false
    }
  },
  mounted () {
    this.list = JSON.parse(sessionStorage.getItem('menuList'))
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;
}
</style>
